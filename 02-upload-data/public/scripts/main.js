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
  const response = await fetch("/uploads");
  if (!response.ok) {
    console.error("Error al obtener los archivos");
    return;
  }
  const data = await response.json();
  fileList.innerHTML = "";
  recycleList.innerHTML = "";

  // Renderizar los archivos en la lista
  data.uploaded.forEach((file) => {
    const li = document.createElement("li");
    li.className =
      "flex justify-between items-center bg-gray-100 p-2 rounded-lg shadow-sm";
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

  // Agregar eventos de eliminación
  document.querySelectorAll("button[data-filename]").forEach((button) => {
    button.addEventListener("click", async (e) => {
      const fileName = e.target.dataset.filename;
      await fetch(`/uploads/${fileName}/recycle`, { method: "POST" });
      fetchFiles();
    });
  });

  document.querySelectorAll("button[data-restore]").forEach((button) => {
    button.addEventListener("click", async (e) => {
      const fileName = e.target.dataset.restore;
      await fetch(`/uploads/${fileName}/restore`, { method: "POST" });
      fetchFiles();
    });
  });
}

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
