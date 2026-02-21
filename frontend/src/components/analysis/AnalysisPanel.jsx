import VerdictCard from './VerdictCard';
import ScoreCard from './ScoreCard';
import RiskMeter from './RiskMeter';
import Breakdown from './Breakdown';

export default function AnalysisPanel({ result }) {
  if (!result) return null;

  const isReal = result.isReal ?? result.authenticityScore >= 0.6;
  const confidence = result.confidence ?? result.authenticityScore;

  return (
    <div className="space-y-6">
      <VerdictCard isReal={isReal} confidence={confidence} />
      <ScoreCard score={result.authenticityScore} label="Authenticity Score" />
      <RiskMeter risk={result.riskLevel} />
      <Breakdown factors={result.factors} />
    </div>
  );
}
