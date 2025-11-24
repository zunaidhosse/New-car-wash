
import React, { useEffect, useRef } from 'react';
import { Html5QrcodeScanner, QrcodeErrorCallback, QrcodeSuccessCallback } from 'html5-qrcode';

interface QRScannerModalProps {
    onClose: () => void;
    onScanSuccess: (decodedText: string) => void;
}

const QRScannerModal: React.FC<QRScannerModalProps> = ({ onClose, onScanSuccess }) => {
    const scannerRef = useRef<Html5QrcodeScanner | null>(null);

    useEffect(() => {
        const qrCodeScanner = new Html5QrcodeScanner(
            "qr-reader",
            { fps: 10, qrbox: { width: 250, height: 250 } },
            false
        );
        scannerRef.current = qrCodeScanner;

        const successCallback: QrcodeSuccessCallback = (decodedText, decodedResult) => {
            qrCodeScanner.clear();
            onScanSuccess(decodedText);
        };
        
        const errorCallback: QrcodeErrorCallback = (errorMessage) => {
            // handle error
        };

        qrCodeScanner.render(successCallback, errorCallback);

        return () => {
            qrCodeScanner.clear().catch(error => {
                console.error("Failed to clear html5-qrcode-scanner.", error);
            });
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-base-100 p-4 sm:p-6 rounded-2xl shadow-lg w-full max-w-md" onClick={(e) => e.stopPropagation()}>
                <div id="qr-reader" className="w-full"></div>
                <button onClick={onClose} className="w-full mt-4 py-3 px-4 rounded-lg bg-base-100 shadow-neumorphic-light dark:shadow-neumorphic-dark hover:shadow-neumorphic-light-inset dark:hover:shadow-neumorphic-dark-inset font-semibold text-primary transition-shadow">
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default QRScannerModal;
