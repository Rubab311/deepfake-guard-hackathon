import { useRouter } from '../../context/RouterContext';

export function Link({ href, children, className = '', ...props }) {
  const { navigate } = useRouter();

  const handleClick = (e) => {
    if (href && (href.startsWith('#') || href.startsWith('/'))) {
      e.preventDefault();
      const path = href.startsWith('#') ? href.slice(1) || '/' : href;
      navigate(path);
    }
  };

  const finalHref = href?.startsWith('/') ? `#${href}` : href;

  return (
    <a href={finalHref} onClick={handleClick} className={className} {...props}>
      {children}
    </a>
  );
}
