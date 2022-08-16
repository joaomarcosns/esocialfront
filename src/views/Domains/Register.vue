<template>
  <div class="container-fluid vh-100">
    <div class="mt-5">
      <div class="rounded d-flex justify-content-center">
        <div class="col-md-6 col-sm-12 shadow-lg p-5 bg-light">
          <div class="text-center">
            <h3 class="text-primary">Castrar um novo domínio</h3>
          </div>
          <form @submit.stop.prevent="submit">
            <div class="row">
              <div class="col">
                <label class="mb-2">Nome do domínio</label>
                <input
                  id="name"
                  type="text"
                  v-model="state.name"
                  class="form-control"
                  placeholder="abc"
                  aria-label="abc"
                />
                <span
                  v-if="v$.name.$error"
                  class="text-danger d-flex justify-content-center m-2"
                >
                  {{ v$.name.$errors[0].$message }}
                </span>
              </div>
              <div class="col">
                <label class="mb-2">Tld</label>
                <input
                  type="text"
                  v-model="state.tld"
                  class="form-control"
                  placeholder="com.br"
                  aria-label="com.br"
                />
                <span
                  v-if="v$.tld.$error"
                  class="text-danger d-flex justify-content-center m-2"
                >
                  {{ v$.tld.$errors[0].$message }}
                </span>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <label class="mb-2 mt-2">Registrado em</label>
                <input
                  id="name"
                  v-model="state.created_at"
                  type="date"
                  class="form-control"
                  placeholder="abc"
                  aria-label="abc"
                />
                <span
                  v-if="v$.created_at.$error"
                  class="text-danger d-flex justify-content-center m-2"
                >
                  {{ v$.created_at.$errors[0].$message }}
                </span>
              </div>
              <div class="col">
                <label class="mb-2 mt-2">Atualizado em</label>
                <input
                  type="date"
                  v-model="state.updated_at"
                  class="form-control"
                  placeholder="com.br"
                  aria-label="com.br"
                />
                <span
                  v-if="v$.updated_at.$error"
                  class="text-danger d-flex justify-content-center m-2"
                >
                  {{ v$.updated_at.$errors[0].$message }}
                </span>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <label class="mb-2 mt-2">Primeiro Serviço</label>
                <input
                  type="text"
                  v-model="state.nameserver_1"
                  class="form-control"
                  placeholder="192.168.0.1.com.br"
                  aria-label="192.168.0.1.com.br"
                />
                <span
                  v-if="v$.nameserver_1.$error"
                  class="text-danger d-flex justify-content-center m-2"
                >
                  {{ v$.nameserver_1.$errors[0].$message }}
                </span>
              </div>
              <div class="col">
                <label class="mb-2 mt-2">Segundo Serviço</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="state.nameserver_2"
                  placeholder="193.168.0.2.com.br"
                  aria-label="193.168.0.2.com.br"
                />
                <span
                  v-if="v$.nameserver_2.$error"
                  class="text-danger d-flex justify-content-center m-2"
                >
                  {{ v$.nameserver_2.$errors[0].$message }}
                </span>
              </div>
            </div>
            <div
              class="row ms-2 me-2 d-flex justify-content-center align-items-center"
            >
              <label class="mb-2 mt-2 text-center">Registrador por</label>
              <input
                type="text"
                class="form-control text-center"
                v-model="state.register"
                placeholder="Teste da Silva Alves"
                aria-label="Teste da Silva Alves"
              />
              <span
                v-if="v$.register.$error"
                class="text-danger d-flex justify-content-center m-2"
              >
                {{ v$.register.$errors[0].$message }}
              </span>
            </div>
            <div class="mt-2 d-flex justify-content-end">
              <button class="btn btn-md btn-success">
                Salvar <i class="bi bi-check-lg"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import {
  required,
  email,
  minLength,
  maxLength,
  sameAs,
  helpers,
} from "@vuelidate/validators";
import api from "@/services/api";
import Cookie from "js-cookie";
import { reactive, computed } from "vue";
export default {
  setup() {
    const state = reactive({
      register: "",
      name: "",
      tld: "",
      created_at: "",
      updated_at: "",
      nameserver_1: "",
      nameserver_2: "",
    });
    const rules = computed(() => {
      return {
        register: {
          required: helpers.withMessage("O compo não pode ser vazio", required),
          maxLength: helpers.withMessage(
            "O campo apena pode ter no máximo 255 caracteres",
            maxLength(255)
          ),
          minLength: helpers.withMessage(
            "O campo apena pode ter no mínio 3 caracteres",
            minLength(3)
          ),
        },
        name: {
          required: helpers.withMessage("O compo não pode ser vazio", required),
          maxLength: helpers.withMessage(
            "O campo apena pode ter no máximo 255 caracteres",
            maxLength(255)
          ),
          minLength: helpers.withMessage(
            "O campo apena pode ter no mínio 3 caracteres",
            minLength(3)
          ),
        },
        tld: {
          required: helpers.withMessage("O compo não pode ser vazio", required),
          maxLength: helpers.withMessage(
            "O campo apena pode ter no máximo 255 caracteres",
            maxLength(255)
          ),
          minLength: helpers.withMessage(
            "O campo apena pode ter no mínio 3 caracteres",
            minLength(3)
          ),
        },
        created_at: {
          required: helpers.withMessage("O compo não pode ser vazio", required),
        },
        updated_at: {
          required: helpers.withMessage("O compo não pode ser vazio", required),
        },
        nameserver_1: {
          required: helpers.withMessage("O compo não pode ser vazio", required),
          maxLength: helpers.withMessage(
            "O campo apena pode ter no máximo 255 caracteres",
            maxLength(255)
          ),
          minLength: helpers.withMessage(
            "O campo apena pode ter no mínio 3 caracteres",
            minLength(3)
          ),
        },
        nameserver_2: {
          required: helpers.withMessage("O compo não pode ser vazio", required),
          maxLength: helpers.withMessage(
            "O campo apena pode ter no máximo 255 caracteres",
            maxLength(255)
          ),
          minLength: helpers.withMessage(
            "O campo apena pode ter no mínio 3 caracteres",
            minLength(3)
          ),
        },
      };
    });

    const v$ = useVuelidate(rules, state);
    return { state, v$ };
  },
  methods: {
    submit() {
      this.v$.$validate();
      if (!this.v$.$error) {
        alert("ok");
        var data = {
          register: this.state.register,
          name: this.state.name,
          tld: this.state.tld,
          created_at: this.state.created_at,
          updated_at: this.state.updated_at,
          nameserver_1: this.state.nameserver_1,
          nameserver_2: this.state.nameserver_2,
        };
        var headers = {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${Cookie.get("_myapp_token")}`,
        };
        api
          .post("/domains/store", data, { headers: headers })
          .then((response) => {
            alert(response.data.message);
          })
          .catch((error) => {
            var messageError = Object.entries(error.response.data.errors);
            messageError.forEach((element) => {
              alert(element[1]);
            });
          });
      }
    },
  },
};
</script>

<style></style>
