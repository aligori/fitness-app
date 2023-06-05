import React from 'react';

const TabSwitch = ({ items = [], activeTab, onChange }) => {
  return (
    <div className="font-medium text-center text-gray-500">
      <ul className="flex">
        {items.map((item) => (
          <li
            role="presentation"
            key={item}
            className={`inline-block p-2 cursor-pointer text-xs rounded-t-lg border-t border-l border-r border-gray-300 ${
              activeTab === item
                ? 'text-gray-600 rounded-t-lg border-t border-l border-r border-gray-400 bg-white'
                : 'hover:bg-gray-200'
            }`}
            onClick={() => onChange(item)}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TabSwitch;
