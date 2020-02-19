import React from 'react';

const AboutContent = ({ text, isEditable, setNewText }) => {
  return (
    <div>
      <div className="text-justify md:mx-16 mx-4">
        {text.map((par, i) => {
          return (
            <p
              className={`my-3 rounded-xl bg-gray-300 p-5 ${
                isEditable ? 'bg-orange-200' : ''
              }`}
              style={{ whiteSpace: 'pre-wrap' }}
              contentEditable={isEditable}
              suppressContentEditableWarning
              key={i}
              onBlur={e => {
                setNewText(i, e.target.innerText);
              }}
            >
              {par}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default AboutContent;
