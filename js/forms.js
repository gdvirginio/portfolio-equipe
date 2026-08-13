
 document.addEventListener("DOMContentLoaded", function () {

    /* ==========================================
       QUEM CONTRATAR
    ========================================== */

    const selectPessoa = document.getElementById("quemContratar");
    const btnAdicionar = document.getElementById("adicionarPessoa");
    const containerPessoas =
      document.getElementById("pessoasSelecionadas");
    const inputPessoas =
      document.getElementById("quemContratarInput");

    let pessoas = [];

    btnAdicionar.addEventListener("click", function () {

      const pessoa = selectPessoa.value;

      if (!pessoa) {
        return;
      }

      // Evita adicionar a mesma pessoa duas vezes
      if (pessoas.includes(pessoa)) {
        return;
      }

      pessoas.push(pessoa);

      atualizarPessoas();

      // Volta o select para a opção inicial
      selectPessoa.value = "";
    });


    function atualizarPessoas() {

      containerPessoas.innerHTML = "";

      pessoas.forEach(function (pessoa, index) {

        const badge = document.createElement("span");

        badge.className =
          "badge text-bg-primary d-flex align-items-center gap-2 p-2";

        badge.innerHTML = `
          ${pessoa}
          <button
            type="button"
            class="btn-close btn-close-white"
            aria-label="Remover ${pessoa}"
            data-index="${index}"
            style="font-size: 0.65rem;"
          ></button>
        `;

        containerPessoas.appendChild(badge);
      });

      // Atualiza o campo que será enviado
      inputPessoas.value = pessoas.join(", ");
    }


    containerPessoas.addEventListener("click", function (event) {

      if (
        event.target.classList.contains("btn-close")
      ) {

        const index =
          event.target.getAttribute("data-index");

        pessoas.splice(index, 1);

        atualizarPessoas();
      }
    });


    /* ==========================================
       ÁREA DE ATUAÇÃO → CARGO
    ========================================== */

    const areaAtuacao =
      document.getElementById("areaAtuacao");

    const cargoContainer =
      document.getElementById("cargoContainer");

    const cargo =
      document.getElementById("cargo");

    areaAtuacao.addEventListener("change", function () {

      if (this.value) {

        cargoContainer.classList.remove("d-none");

        cargo.required = true;

      } else {

        cargoContainer.classList.add("d-none");

        cargo.required = false;
        cargo.value = "";

      }
    });


    /* ==========================================
       MODALIDADE → LOCAL
    ========================================== */

    const modalidade =
      document.getElementById("modalidade");

    const localContainer =
      document.getElementById("localContainer");

    const localTrabalho =
      document.getElementById("localTrabalho");

    modalidade.addEventListener("change", function () {

      if (
        this.value === "Presencial" ||
        this.value === "Híbrido"
      ) {

        localContainer.classList.remove("d-none");

        localTrabalho.required = true;

      } else {

        localContainer.classList.add("d-none");

        localTrabalho.required = false;
        localTrabalho.value = "";

      }
    });


    /* ==========================================
       VALIDAÇÃO BOOTSTRAP
    ========================================== */

    const form =
      document.getElementById("contactForm");

    form.addEventListener(
      "submit",
      function (event) {

        if (!form.checkValidity()) {

          event.preventDefault();
          event.stopPropagation();

        }

        form.classList.add("was-validated");

      },
      false
    );

  });