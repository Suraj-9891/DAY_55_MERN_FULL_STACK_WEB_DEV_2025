document.addEventListener('DOMContentLoaded', function() {
    const generateBtn = document.getElementById('generateBtn');
    const generateWithCustomizationBtn = document.getElementById('generateWithCustomizationBtn');
    const qrInput = document.getElementById('qrInput');
    const sizeSelect = document.getElementById('size');
    const foregroundColorInput = document.getElementById('foregroundColor');
    const backgroundColorInput = document.getElementById('backgroundColor');
    const logoUploadInput = document.getElementById('logoUpload');
    const qrCanvas = document.getElementById('qrCanvas');
    const downloadBtn = document.getElementById('downloadBtn');
    const shareFacebookBtn = document.getElementById('shareFacebookBtn');
    const shareTwitterBtn = document.getElementById('shareTwitterBtn');
    
    // QR Code generation with basic input
    generateBtn.addEventListener('click', function() {
      const inputData = qrInput.value.trim();
      if (inputData === "") {
        alert("Please enter some text, URL, or email.");
        return;
      }
      generateQRCode(inputData);
    });
  
    // QR Code generation with customization options
    generateWithCustomizationBtn.addEventListener('click', function() {
      const inputData = qrInput.value.trim();
      if (inputData === "") {
        alert("Please enter some text, URL, or email.");
        return;
      }
  
      const size = parseInt(sizeSelect.value);
      const foregroundColor = foregroundColorInput.value;
      const backgroundColor = backgroundColorInput.value;
      const logoFile = logoUploadInput.files[0];
  
      generateQRCode(inputData, size, foregroundColor, backgroundColor, logoFile);
    });
  
    // Generate QR Code function
    function generateQRCode(data, size = 256, foregroundColor = "#000000", backgroundColor = "#ffffff", logoFile = null) {
      const options = {
        width: size,
        color: {
          dark: foregroundColor,
          light: backgroundColor
        }
      };
  
      if (logoFile) {
        const reader = new FileReader();
        reader.onload = function(event) {
          const logo = new Image();
          logo.src = event.target.result;
  
          logo.onload = function() {
            QRCode.toCanvas(qrCanvas, data, options, function(error) {
              if (error) console.error(error);
              else {
                overlayLogo(logo);
              }
            });
          };
        };
        reader.readAsDataURL(logoFile);
      } else {
        QRCode.toCanvas(qrCanvas, data, options, function(error) {
          if (error) console.error(error);
        });
      }
    }
  
    // Overlay logo on QR Code
    function overlayLogo(logo) {
      const canvasContext = qrCanvas.getContext('2d');
      const logoSize = qrCanvas.width / 5;
      const logoX = (qrCanvas.width - logoSize) / 2;
      const logoY = (qrCanvas.height - logoSize) / 2;
  
      canvasContext.drawImage(logo, logoX, logoY, logoSize, logoSize);
    }
  
    // Download QR Code as PNG
    downloadBtn.addEventListener('click', function() {
      const dataUrl = qrCanvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'qr-code.png';
      link.click();
    });
  
    // Share on Facebook
    shareFacebookBtn.addEventListener('click', function() {
      const dataUrl = qrCanvas.toDataURL('image/png');
      const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(dataUrl)}`;
      window.open(url, '_blank');
    });
  
    // Share on Twitter
    shareTwitterBtn.addEventListener('click', function() {
      const dataUrl = qrCanvas.toDataURL('image/png');
      const url = `https://twitter.com/intent/tweet?text=Check out this QR Code&url=${encodeURIComponent(dataUrl)}`;
      window.open(url, '_blank');
    });
  });
  