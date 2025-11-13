const HomeSkeleton = () => {
  return (
    <div className="animate-pulse min-h-screen bg-[#0b0b0b] text-white px-4 sm:px-8 md:px-12 lg:px-16">
      <div className="h-[500px] sm:h-[650px] w-full bg-gray-800/50 rounded-2xl mb-12" />

      <div className="space-y-10">
        {[1, 2, 3].map((_, i) => (
          <div key={i}>
            <div className="h-6 w-56 bg-gray-700/50 rounded mb-6" />
            <div className="flex gap-4 overflow-hidden">
              {[...Array(5)].map((_, j) => (
                <div
                  key={j}
                  className="w-[220px] h-80 bg-gray-800/50 rounded-xl shrink-0"
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-8 mt-16">
        <div className="flex-1 h-[250px] bg-gray-800/50 rounded-xl" />
        <div className="flex-1 h-[250px] bg-gray-800/50 rounded-xl" />
        <div className="flex-1 h-[250px] bg-gray-800/50 rounded-xl" />
      </div>
    </div>
  );
};
export default HomeSkeleton;
