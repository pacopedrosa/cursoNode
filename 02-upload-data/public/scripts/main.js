// Obtener referencias
const uploadForm = document.getElementById("uploadForm");
const fileList = document.getElementById("fileList");
const recycleList = document.getElementById("recycleList");
const emptyRecycleBtn = document.getElementById("emptyRecycle");
let diskUsageChart;

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function updateChart(uploadedSize, recycledSize) {
  if (diskUsageChart) {
    diskUsageChart.destroy();
  }

  const ctx = document.getElementById('diskUsageChart').getContext('2d');
  diskUsageChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Archivos', 'Papelera'],
      datasets: [{
        data: [uploadedSize, recycledSize],
        backgroundColor: ['#3B82F6', '#EF4444']
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom'
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.label}: ${formatBytes(context.raw)}`;
            }
          }
        }
      }
    }
  });
}

// Función para listar los archivos subidos
async function fetchFiles() {
  try {
    const response = await fetch("/uploads");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    
    fileList.innerHTML = "";
    recycleList.innerHTML = "";

    // Renderizar archivos
    data.uploaded.forEach((file) => {
      const li = document.createElement("li");
      li.className = "flex justify-between items-center bg-gray-100 p-2 rounded-lg shadow-sm";
      li.innerHTML = `
        <span>${file.name} (${formatBytes(file.size)})</span>
        <button class="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600" data-filename="${file.name}">
          Mover a papelera
        </button>
      `;
      fileList.appendChild(li);
    });

    data.recycled.forEach((file) => {
      const li = document.createElement("li");
      li.className = "flex justify-between items-center bg-gray-100 p-2 rounded-lg shadow-sm";
      li.innerHTML = `
        <span>${file.name} (${formatBytes(file.size)})</span>
        <button class="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600" data-restore="${file.name}">
          Restaurar
        </button>
      `;
      recycleList.appendChild(li);
    });

    updateChart(data.totalUploadSize, data.totalRecycledSize);
  } catch (error) {
    console.error('Error:', error);
    alert('Error al cargar los archivos');
  }
}

// Event delegation para los botones de mover a papelera
fileList.addEventListener('click', async (e) => {
  const button = e.target.closest('button[data-filename]');
  if (!button) return;

  try {
    const fileName = encodeURIComponent(button.dataset.filename);
    console.log('Intentando mover archivo:', fileName);

    const response = await fetch(`/uploads/${fileName}/recycle`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Error al mover el archivo');
    }
    
    console.log('Respuesta del servidor:', data);
    await fetchFiles();
  } catch (error) {
    console.error('Error detallado:', error);
    alert(error.message);
  }
});

// Event delegation para los botones de restaurar
recycleList.addEventListener('click', async (e) => {
  const button = e.target.closest('button[data-restore]');
  if (!button) return;

  try {
    const fileName = encodeURIComponent(button.dataset.restore);
    console.log('Intentando restaurar archivo:', fileName);

    const response = await fetch(`/uploads/${fileName}/restore`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Error al restaurar el archivo');
    }
    
    console.log('Respuesta del servidor:', data);
    await fetchFiles();
  } catch (error) {
    console.error('Error detallado:', error);
    alert(error.message);
  }
});

emptyRecycleBtn.addEventListener("click", async () => {
  await fetch("/uploads/recycle", { method: "DELETE" });
  fetchFiles();
});

// Manejador de envío del formulario de subida
uploadForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(uploadForm);
  const response = await fetch("/uploads", {
    method: "POST",
    body: formData,
  });
  if (response.ok) {
    uploadForm.reset(); // Limpiar el formulario
    fetchFiles(); // Actualizar la lista
  } else {
    console.error("Error al subir el archivo");
  }
});

// Cargar la lista de archivos al cargar la página
document.addEventListener("DOMContentLoaded", fetchFiles);
