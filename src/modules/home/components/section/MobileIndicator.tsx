interface ServiceItem {
  step: string;
  name: string;
  packageLabel: string;
  title: string;
  description: string;
}

interface Props {
  services: ServiceItem[];
  activeStep: number;
  onChange: (index: number) => void;
}

export default function MobileIndicator({
  services,
  activeStep,
  onChange,
}: Props) {
  return (
    <div className="flex justify-center gap-2">
      {[...services]
        .sort((a, b) => Number(a.step) - Number(b.step))
        .map((service) => {
          const step = Number(service.step);

          const targetIndex = services.findIndex(
            (item) => Number(item.step) === step,
          );

          return (
            <button
              key={service.step}
              type="button"
              onClick={() => onChange(targetIndex)}
              aria-label={`${service.name}, step ${step}`}
              className="flex items-center justify-center rounded-full p-2"
            >
              <span
                className={`block rounded-full transition-all ${
                  activeStep === step
                    ? "h-2 w-6 bg-[#2B71D3]"
                    : "h-2 w-2 bg-[#D9D9D9]"
                }`}
                aria-hidden="true"
              />
            </button>
          );
        })}
    </div>
  );
}
