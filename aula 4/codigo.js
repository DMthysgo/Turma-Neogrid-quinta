var Numero_1, Numero_2;


Numero_1 = Number(window.prompt('Escreva o primeiro valor, de 1 até 5'));
Numero_2 = Number(window.prompt('Escreva o segundo valor, de 1 até 5'));
while (Numero_1 != Numero_2) {
  window.alert('Escreva os números novamente');
  Numero_1 = Number(window.prompt('Escreva o primeiro valor, de 1 até 5'));
  Numero_2 = Number(window.prompt('Escreva o segundo valor, de 1 até 5'));
}
if (Numero_1 == Numero_2) {
    window.alert('números iguais');
}