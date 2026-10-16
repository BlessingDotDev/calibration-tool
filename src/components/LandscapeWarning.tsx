
import { TriangleAlert } from "lucide-react";

function LandscapeWarning() {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 lg:hidden">
      <TriangleAlert
        size={20}
        className="mt-0.5 shrink-0 text-amber-500"
        aria-hidden="true"
      />

      <p className="text-xs text-amber-700 dark:text-amber-400">
        For better graph quality, rotate your mobile device to
        landscape mode before generating the PDF.
      </p>
    </div>
  );
}

export default LandscapeWarning;
