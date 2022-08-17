<template>
  <div class="rounded d-flex justify-content-center mt-5">
    <div class="col-md-11 col-sm-12 shadow-lg p-5 bg-light">
      <div class="text-center">
        <h3 class="text-primary">Listagem dos Domínios</h3>
      </div>
      <div class="d-flex justify-content-end">
        <div class="dropup">
          <button
            class="btn btn-secondary"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Importar <i class="fa-solid fa-file-import"></i>
          </button>
          <ul class="dropdown-menu">
            <li>
              <button class="dropdown-item" @click.prevent="modelImport">
                Baixar modelo
              </button>
            </li>
            <li>
              <button
                class="dropdown-item"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                Importar dados
              </button>
            </li>
          </ul>
        </div>

        <button class="btn btn-success ms-2" @click.prevent="fileExport">
          Exportar <i class="fa-solid fa-file-export"></i>
        </button>

        <a class="btn btn-primary ms-2" @click="registarDomino">
          Cadastrar <i class="fa-solid fa-plus"></i>
        </a>
      </div>
      <div class="table-responsive mt-4">
        <table class="table table-striped table-bordered" id="myTable">
          <thead>
            <tr>
              <th>Domínio</th>
              <th>Tld</th>
              <th>Data de registro</th>
              <th>Data de Atualização</th>
              <th>Registrador</th>
              <th>Nome dos servições</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="data of tableData" :key="data.id">
              <td>{{ data.name }}</td>
              <td>{{ data.tld }}</td>
              <td>{{ this.formatDate(data.created_at) }}</td>
              <td>{{ this.formatDate(data.updated_at) }}</td>
              <td>{{ data.registers.name }}</td>
              <td>
                <div v-for="names_server in data.names_servers">
                  {{ names_server.names_server }}
                </div>
              </td>
              <td>
                <button
                  v-on:click="edit(data.id)"
                  class="btn btn-warning btn-sm"
                >
                  <i class="bi bi-pencil-square"></i>
                </button>
                <button class="btn btn-danger btn-sm ms-2">
                  <i class="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- Modal -->
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <form @submit.stop.prevent="importFile">
          <div class="modal-body">
            <div>
              <input
                @change="newFile"
                type="file"
                name="file"
                class="form-control"
                id="file"
                accept=".xlsx"
              />
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Fechar
            </button>
            <button type="submit" class="btn btn-primary">
              Importar dados
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router";
import api from "@/services/api";
import Cookie from "js-cookie";
export default {
  data() {
    return {
      file: "",
      tableData: [],
    };
  },
  created() {
    this.getAllData()
      .then((response) => {
        this.tableData = response.data.data;
      })
      .catch();
  },
  methods: {
    fileExport() {
      var headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${Cookie.get("_myapp_token")}`,
      };
      api
        .get("/domains/export", { headers: headers }, { ResponseType: "blob" })
        .then((res) => {
          var fileUrl = window.URL.createObjectURL(new Blob([res.data]));
          var docUrl = document.createElement("a");
          docUrl.href = fileUrl;
          docUrl.setAttribute("download", "domains.csv");
          document.body.appendChild(docUrl);
          docUrl.click();
        })
        .catch((error) => {
          var messageError = Object.entries(error.response.data.errors);
          messageError.forEach((element) => {
            alert(element[1]);
          });
        });
    },
    modelImport() {
      var headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${Cookie.get("_myapp_token")}`,
      };
      api.interceptors.response.use(
        (response) => {
          return response;
        },
        async (error) => {
          const { request, response } = error;

          if (
            request.responseType === "blob" &&
            response.data instanceof Blob &&
            response.data.type &&
            response.data.type.toLowerCase().includes("json")
          ) {
            return await new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.onload = () => {
                response.data = JSON.parse(reader.result);
                resolve(Promise.reject(error));
              };
              reader.onerror = () => reject(error);
              reader.readAsText(response.data);
            });
          }

          return await Promise.reject(error);
        }
      );
      api
        .get("/domains/modelImport", { headers: headers, responseType: "blob" })
        .then((res) => {
          var fileUrl = window.URL.createObjectURL(new Blob([res.data]));
          var docUrl = document.createElement("a");
          docUrl.href = fileUrl;
          docUrl.setAttribute("download", "modelo.xlsx");
          document.body.appendChild(docUrl);
          docUrl.click();
        })
        .catch((error) => {
          alert(error.response);
        });
    },
    newFile(event) {
      this.file = event.target.files[0];
    },
    importFile() {
      var form = "";
      form = new FormData();
      form.append("file", this.file);
      var headers = {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
        Authorization: `Bearer ${Cookie.get("_myapp_token")}`,
      };

      api
        .post("/domains/upload", form, { headers: headers })
        .then((response) => {
          alert(response.data.message);
        })
        .catch((error) => {
          console.error(error.response);
        });
    },
    getAllData() {
      var headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${Cookie.get("_myapp_token")}`,
      };
      const data = api.get("/domains/", { headers: headers });
      return data;
    },
    registarDomino() {
      router.push({ name: "registarDomino" });
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString("pt-BR");
    },
    edit(id) {
      router.push(`/dominio/edit/${id}`);
    },
  },
};
</script>
