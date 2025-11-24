
import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

interface QRModalProps {
  data: string;
  onClose: () => void;
}

const QRModal: React.FC<QRModalProps> = ({ data, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-base-100 p-8 rounded-2xl shadow-neumorphic-light dark:shadow-neumorphic-dark" onClick={(e) => e.stopPropagation()}>
        <div className="bg-white p-4 rounded-lg">
            <QRCodeSVG value={data} size={256} />
        </div>
        <button onClick={onClose} className="w-full mt-6 py-2 px-4 rounded-lg bg-base-100 shadow-neumorphic-light dark:shadow-neumorphic-dark hover:shadow-neumorphic-light-inset dark:hover:shadow-neumorphic-dark-inset font-semibold text-primary transition-shadow">
          Close
        </button>
      </div>
    </div>
  );
};

export default QRModal;
