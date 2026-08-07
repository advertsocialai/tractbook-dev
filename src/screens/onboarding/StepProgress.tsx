interface StepProgressProps {
  current: number
  total: number
}

export default function StepProgress({ current, total }: StepProgressProps) {
  return (
    <div className="mb-6">
      <div className="flex gap-1.5 mb-2">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full ${
              i < current ? "bg-blue-700" : "bg-gray-200"
            }`}
          />
        ))}
      </div>
      <p className="text-xs text-gray-500">Step {current} of {total}</p>
    </div>
  )
}
