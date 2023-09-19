document.getElementById('loadButton').addEventListener('click', function() {
  var fileInput = document.getElementById('extensionFile');
  var file = fileInput.files[0];

  if (file) {
    var reader = new FileReader();

    reader.onload = function(e) {
      var extensionData = e.target.result;

      // Create a new <script> element
      var scriptElement = document.createElement('script');
      scriptElement.textContent = `
        chrome.management.install({
          'data': '${btoa(extensionData)}',
          'unpack': true
        }, function(extensionInfo) {
          console.log('Extension loaded:', extensionInfo);
        });
      `;

      // Append the <script> element to the <body> tag
      document.body.appendChild(scriptElement);
    };

    reader.readAsBinaryString(file);
  }
});
