function apenasNumeros(texto) {
    return texto.replace(/\D/g, "");
}

const nome = document.getElementById("nome");
const email = document.getElementById("email");
const data = document.getElementById("data");
const telFixo = document.getElementById("telFixo");
const telCelular = document.getElementById("telCelular");
const area = document.getElementById("area");
const curso = document.getElementById("curso");
const matricula = document.getElementById("matricula");
const lattes = document.getElementById("lattes");

const radioProf = document.getElementById("radioProf");
const radioAluno = document.getElementById("radioAluno");

const groupArea = document.getElementById("group-area");
const groupCurso = document.getElementById("group-curso");
const rowLattes = document.getElementById("row-lattes");

class Pessoa {
    constructor(nome, email, data, telFixo, telCelular, matricula) {
        this.nome = nome;
        this.email = email;
        this.data = data;
        this.telFixo = telFixo;
        this.telCelular = telCelular;
        this.matricula = matricula;
    }
}

class Professor extends Pessoa {
    constructor(nome, email, data, telFixo, telCelular, matricula, area, lattes) {
        super(nome, email, data, telFixo, telCelular, matricula);
        this.area = area;
        this.lattes = lattes;
    }
}

class Aluno extends Pessoa {
    constructor(nome, email, data, telFixo, telCelular, matricula, curso) {
        super(nome, email, data, telFixo, telCelular, matricula);
        this.curso = curso;
    }
}

data.addEventListener("input", function () {
    let v = apenasNumeros(this.value);

    if (v.length > 2) v = v.slice(0, 2) + "/" + v.slice(2);
    if (v.length > 5) v = v.slice(0, 5) + "/" + v.slice(5, 9);

    this.value = v;
});

telFixo.addEventListener("input", function () {
    let v = apenasNumeros(this.value).slice(0, 10);

    v = v.replace(/^(\d{2})(\d)/, "($1)$2");
    v = v.replace(/(\d{4})(\d)/, "$1-$2");

    this.value = v;
});

telCelular.addEventListener("input", function () {
    let v = apenasNumeros(this.value).slice(0, 11);

    v = v.replace(/^(\d{2})(\d)/, "($1)$2");
    v = v.replace(/(\d{5})(\d)/, "$1-$2");

    this.value = v;
});

matricula.addEventListener("input", function () {
    this.value = apenasNumeros(this.value);
});

function mudarPerfil() {
    if (radioProf.checked) {
        groupArea.style.display = "block";
        groupCurso.style.display = "none";
        rowLattes.style.display = "block";
    } else {
        groupArea.style.display = "none";
        groupCurso.style.display = "block";
        rowLattes.style.display = "none";
    }

    matricula.value = "";
}

radioProf.addEventListener("change", mudarPerfil);
radioAluno.addEventListener("change", mudarPerfil);

function mostrarErro(id, erro) {
    document.getElementById(id).style.display = erro ? "block" : "none";
}

function validarNome() {
    let partes = nome.value.trim().split(" ");
    let valido = partes.length >= 2 && partes[0] !== "" && partes[1] !== "";
    mostrarErro("erro-nome", !valido);
    return valido;
}

function validarEmail() {
    let valido = /\S+@\S+\.\S+/.test(email.value);
    mostrarErro("erro-email", !valido);
    return valido;
}

function validarData() {
    let valido = /^\d{2}\/\d{2}\/\d{4}$/.test(data.value);
    mostrarErro("erro-data", !valido);
    return valido;
}

function validarTelFixo() {
    let valido = /^\(\d{2}\)\d{4}-\d{4}$/.test(telFixo.value);
    mostrarErro("erro-telFixo", !valido);
    return valido;
}

function validarTelCelular() {
    let valido = /^\(\d{2}\)\d{5}-\d{4}$/.test(telCelular.value);
    mostrarErro("erro-telCelular", !valido);
    return valido;
}

function validarArea() {
    if (radioAluno.checked) return true;
    let valido = area.value.trim() !== "";
    mostrarErro("erro-area", !valido);
    return valido;
}

function validarCurso() {
    if (radioProf.checked) return true;
    let valido = curso.value.trim() !== "";
    mostrarErro("erro-curso", !valido);
    return valido;
}

function validarMatricula() {
    let val = matricula.value;

    let valido =
        (radioProf.checked && val.length === 5) ||
        (radioAluno.checked && val.length === 10);

    mostrarErro("erro-matricula", !valido);
    return valido;
}

function validarLattes() {
    if (radioAluno.checked) return true;
    let valido = lattes.value.trim() !== "";
    mostrarErro("erro-lattes", !valido);
    return valido;
}

nome.addEventListener("blur", validarNome);
email.addEventListener("blur", validarEmail);
data.addEventListener("blur", validarData);
telFixo.addEventListener("blur", validarTelFixo);
telCelular.addEventListener("blur", validarTelCelular);
area.addEventListener("blur", validarArea);
curso.addEventListener("blur", validarCurso);
matricula.addEventListener("blur", validarMatricula);
lattes.addEventListener("blur", validarLattes);

document.getElementById("cadastroForm").addEventListener("submit", function (e) {
    let valido =
        validarNome() &&
        validarEmail() &&
        validarData() &&
        validarTelFixo() &&
        validarTelCelular() &&
        validarArea() &&
        validarCurso() &&
        validarMatricula() &&
        validarLattes();

    if (!valido) {
        e.preventDefault();
    }

    let pessoa;

    if (radioProf.checked) {
        pessoa = new Professor(
            nome.value,
            email.value,
            data.value,
            telFixo.value,
            telCelular.value,
            matricula.value,
            area.value,
            lattes.value
        );
    } else {
        pessoa = new Aluno(
            nome.value,
            email.value,
            data.value,
            telFixo.value,
            telCelular.value,
            matricula.value,
            curso.value
        );
    }

    console.log("Objeto criado:", pessoa);
});

document.getElementById("btnReset").addEventListener("click", function () {
    document.querySelectorAll(".error-msg").forEach(el => el.style.display = "none");

    radioProf.checked = true;
    mudarPerfil();
});

mudarPerfil();