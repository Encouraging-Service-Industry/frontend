import React from 'react';

interface ServiceCategoryCardProps {
  id: string;
  name: string;
  description: string;
  icon: string;
  providersCount: number;
  onClick: (id: string) => void;
  showProvidersCount?: boolean; // New optional prop
  showDescription?: boolean; // New optional prop
}

const ServiceCategoryCard: React.FC<ServiceCategoryCardProps> = ({
  id,
  name,
  description,
  icon,
  providersCount,
  onClick,
  showProvidersCount = true, // Default to true
  showDescription = true, // Default to true
}) => {
  return (
    <button
      key={id}
      onClick={() => onClick(id)}
      className="relative flex flex-col rounded-xl shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 bg-white group overflow-hidden"
    >
      {/* Image Area */}
      <div className="w-full h-40 overflow-hidden">
        <img
          src={icon}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Area */}
      <div className="p-6 flex flex-col items-start text-left flex-grow">
        {/* Primary Title: Service Name */}
        <h3 className="font-extrabold text-xl text-gray-900 group-hover:text-indigo-700 transition-colors mb-1">
          {name}
        </h3>
        {/* Secondary Info: Provider Count */}
        {showProvidersCount && (
          <p className="text-sm text-gray-500 mb-2">
            {providersCount} providers
          </p>
        )}
        {/* Tertiary Description */}
        {showDescription && description && (
          <p className="text-base text-gray-700 line-clamp-2">
            {description}
          </p>
        )}
      </div>
    </button>
  );
};

export default ServiceCategoryCard;
