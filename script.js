// Array com os planetas na ordem especificada
const planets = ['Mercúrio', 'Vênus', 'Terra', 'Marte', 'Júpiter', 'Saturno', 'Urano', 'Netuno', 'Plutão'];

// Função para descobrir o planeta da sorte
function discoverLuckyPlanet(hour) {
  const hourStr = hour.toString();
  let sumOfSquares = 0;
  let calculationSteps = [];

  for (let digit of hourStr) {
    const num = parseInt(digit);
    const square = num * num;
    calculationSteps.push(`${num}² = ${square}`);
    sumOfSquares += square;
  }

  const planetIndex = (sumOfSquares - 1) % planets.length;

  return {
    planet: planets[planetIndex],
    calculation: calculationSteps.join(' + ') + ' = ' + sumOfSquares,
    sum: sumOfSquares,
    index: planetIndex
  };
}

// Função para atualizar a interface com o resultado
function updateResult(hour) {
  const resultDiv = document.getElementById('resultado');
  const calculationDiv = document.getElementById('calculo');

  // Limpa os resultados anteriores
  resultDiv.textContent = '';
  calculationDiv.textContent = '';

  // Verifica se o campo está vazio ou não é um número
  if (hour === '' || isNaN(hour)) {
    resultDiv.innerHTML =
      '<div class="error-message">⏰ Por favor, insira uma hora válida (0-23) ou clique em RETORNAR para usar a hora atual</div>';
    return;
  }

  // Verifica se a hora está no intervalo válido
  if (hour < 0 || hour > 23) {
    resultDiv.innerHTML = '<div class="error-message">⚠️ Hora inválida! Por favor, insira um valor entre 0 e 23</div>';
    return;
  }

  // Se tudo estiver válido, calcula e mostra o resultado
  const { planet, calculation, sum, index } = discoverLuckyPlanet(hour);

  resultDiv.innerHTML = `O Planeta da Sorte é: <span style="color: #03e9f4; font-size: 28px;">${planet}</span>`;
  calculationDiv.innerHTML = `
        <strong>Cálculo:</strong><br>
        ${calculation}<br>
        Soma total: ${sum}<br>
        Número de planetas: ${planets.length}<br>
        Índice calculado: (${sum} - 1) % ${planets.length} = ${index}
    `;
}

// Função para usar a hora atual do sistema
function useCurrentTime() {
  const now = new Date();
  const currentHour = now.getHours();
  document.getElementById('horaInput').value = currentHour;
  updateResult(currentHour);
}

// Função para limpar todos os campos
function resetAll() {
  document.getElementById('horaInput').value = '';
  document.getElementById('resultado').textContent = '';
  document.getElementById('calculo').textContent = '';
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('descobrirBtn').addEventListener('click', () => {
    const hourInput = document.getElementById('horaInput').value;
    const hour = hourInput === '' ? NaN : parseInt(hourInput);
    updateResult(hour);
  });

  document.getElementById('retornarBtn').addEventListener('click', resetAll);
});
