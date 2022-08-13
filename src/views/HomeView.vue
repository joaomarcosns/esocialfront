<template>
  <div class="rounded d-flex justify-content-center mt-5">
    <div class="col-md-10 col-sm-12 shadow-lg p-5 bg-light">
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
      </div>
      <div class="table-responsive mt-4">
        <table class="table table-striped table-bordered">
          <thead>
            <tr>
              <th class="text-center">Teste</th>
              <th>Teste</th>
              <th>Teste</th>
              <th>Teste</th>
            </tr>
          </thead>
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
                @change.stop.prevent="file"
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
import api from "@/services/api";
import Cookie from "js-cookie";
export default {
  setup() {
    return {
      file: "",
    };
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
      api
        .get(
          "/domains/modelImport",
          { headers: headers },
          { ResponseType: "blob" }
        )
        .then((res) => {
          var fileUrl = window.URL.createObjectURL(new Blob([res.data]));
          var docUrl = document.createElement("a");
          docUrl.href = fileUrl;
          docUrl.setAttribute("download", "modelo.xlsx");
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
    file(event) {
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
          var messageError = Object.entries(error.response.data.errors);
          messageError.forEach((element) => {
            alert(element[1]);
          });
        });
    },
  },
};
</script>
