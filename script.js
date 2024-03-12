document.addEventListener('DOMContentLoaded', function () {
    const container = document.querySelector('.container');
    const qrInput = document.getElementById('qrInput');
    const generateBtn = document.getElementById('generateBtn');
    const generateBtnText = document.getElementById('generateBtnText');
    const qrImg = document.getElementById('qrImg');
    const downloadBtn = document.getElementById('downloadBtn');
    const clearBtn = document.getElementById('clearBtn');

    let preValue;

    function generateQRCode() {
        const qrValue = qrInput.value.trim();
        if (!qrValue || preValue === qrValue) return;

        preValue = qrValue;
        generateBtnText.innerText = 'Oluşturuluyor..';

        qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrValue}`;
        qrImg.addEventListener('load', function () {
            container.classList.add('active');
            generateBtnText.innerText = 'QR Kod Oluştur';
            downloadBtn.style.display = 'block';
        });
    }

    generateBtn.addEventListener('click', generateQRCode);

    qrInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            generateQRCode();
        }
    });

    clearBtn.addEventListener('click', () => {
        qrInput.value = '';
        container.classList.remove('active');
        preValue = '';
        downloadBtn.style.display = 'none';
    });

    qrInput.addEventListener('keyup', function () {
        if (!qrInput.value.trim()) {
            container.classList.remove('active');
            preValue = '';
            downloadBtn.style.display = 'none';
        }
    });

    downloadBtn.addEventListener('click', () => {
        const qrValue = qrInput.value.trim();
        const svgData = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink">
            <image href="https://api.qrserver.com/v1/create-qr-code/?size=200x200&amp;data=${qrValue}" width="200" height="200"/>
        </svg>`;

        const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(blob);

        const downloadLink = document.createElement('a');
        downloadLink.href = url;
        downloadLink.download = 'qr_code.svg';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    });
});
