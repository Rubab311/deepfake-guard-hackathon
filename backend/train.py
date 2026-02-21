"""
Training script for deepfake detection model.
Train ResNet18 or EfficientNet on FaceForensics++ / Celeb-DF datasets.

Usage:
  python train.py --data-dir /path/to/dataset --epochs 50 --model resnet18

Dataset structure:
  dataset/
    real/
      img1.jpg
      img2.jpg
    fake/
      img1.jpg
      img2.jpg

For FaceForensics++ or Celeb-DF: extract frames, organize into real/ and fake/.
"""

import argparse
import torch
import torch.nn as nn
from torch.utils.data import DataLoader
from torchvision import datasets, models, transforms
from pathlib import Path


def get_transforms(image_size=224):
    return transforms.Compose([
        transforms.Resize((image_size, image_size)),
        transforms.RandomHorizontalFlip(),
        transforms.RandomRotation(10),
        transforms.ColorJitter(brightness=0.2, contrast=0.2),
        transforms.ToTensor(),
        transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225]),
    ])


def get_val_transforms(image_size=224):
    return transforms.Compose([
        transforms.Resize((image_size, image_size)),
        transforms.ToTensor(),
        transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225]),
    ])


def build_model(arch: str, num_classes: int = 2):
    arch = arch.lower()
    if arch == "resnet18":
        model = models.resnet18(weights=models.ResNet18_Weights.IMAGENET1K_V1)
        model.fc = nn.Linear(model.fc.in_features, num_classes)
    elif arch == "efficientnet_b0":
        model = models.efficientnet_b0(weights=models.EfficientNet_B0_Weights.IMAGENET1K_V1)
        model.classifier[1] = nn.Linear(model.classifier[1].in_features, num_classes)
    else:
        raise ValueError(f"Unknown architecture: {arch}")
    return model


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--data-dir", type=str, required=True, help="Path to dataset (real/ and fake/ subdirs)")
    parser.add_argument("--epochs", type=int, default=30)
    parser.add_argument("--batch-size", type=int, default=32)
    parser.add_argument("--lr", type=float, default=1e-4)
    parser.add_argument("--model", type=str, default="resnet18", choices=["resnet18", "efficientnet_b0"])
    parser.add_argument("--output", type=str, default="weights.pth")
    args = parser.parse_args()

    data_dir = Path(args.data_dir)
    train_dir = data_dir / "train"
    val_dir = data_dir / "val"
    if not val_dir.exists():
        val_dir = train_dir  # fallback

    train_ds = datasets.ImageFolder(str(train_dir), transform=get_transforms())
    val_ds = datasets.ImageFolder(str(val_dir), transform=get_val_transforms())
    train_loader = DataLoader(train_ds, batch_size=args.batch_size, shuffle=True, num_workers=0, pin_memory=True)
    val_loader = DataLoader(val_ds, batch_size=args.batch_size, shuffle=False, num_workers=0)

    model = build_model(args.model).cuda()
    criterion = nn.CrossEntropyLoss()
    optimizer = torch.optim.Adam(model.parameters(), lr=args.lr)

    for epoch in range(args.epochs):
        model.train()
        total_loss = 0.0
        for images, labels in train_loader:
            images, labels = images.cuda(), labels.cuda()
            optimizer.zero_grad()
            out = model(images)
            loss = criterion(out, labels)
            loss.backward()
            optimizer.step()
            total_loss += loss.item()
        print(f"Epoch {epoch+1}/{args.epochs} Loss: {total_loss/len(train_loader):.4f}")

        model.eval()
        correct = 0
        total = 0
        with torch.no_grad():
            for images, labels in val_loader:
                images, labels = images.cuda(), labels.cuda()
                out = model(images)
                _, pred = out.max(1)
                correct += (pred == labels).sum().item()
                total += labels.size(0)
        print(f"  Val Acc: {100*correct/total:.2f}%")

    torch.save({"model": model.state_dict(), "classes": train_ds.classes}, args.output)
    print(f"Saved to {args.output}")


if __name__ == "__main__":
    main()
