document.getElementById('calculateBtn').addEventListener('click', function() {
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const ageGroup = document.getElementById('ageGroup').value;
    
    if (isNaN(weight) || isNaN(height) || height <= 0 || weight <= 0) {
        alert('Por favor, ingresa valores válidos.');
        return;
    }
    
    displayInfoCards(weight, height);
    
    const imc = (weight / (height * height)).toFixed(2);
    const category = getCategory(imc, ageGroup);
    
    document.getElementById('result').innerHTML = `Su IMC es <strong>${imc}</strong>, lo que indica que su peso está en la categoría de <strong>${category}</strong> para ${ageGroup === 'adult' ? 'adultos' : 'niños'} de su estatura.`;
    
    const imcTable = getImcTable(ageGroup, imc);
    document.getElementById('imcTable').innerHTML = imcTable;

    displayPersonImage(category);

    displayRecommendations(category);

});
function displayRecommendations(category) {
    const recommendations = document.getElementById('recommendations');
    let message = '<h4>Recomendaciones:</h4><div class="row">';

    switch (category) {
        case 'Bajo peso':
            message += `
                <div class="col-md-12">
                    <div class="card mb-3">
                        <div class="card-body">
                            <h5 class="card-title">Bajo peso</h5>
                            <ul>
                                <li class="animate__animated animate__fadeInLeft">Aumenta la ingesta calórica de forma saludable, incluyendo alimentos ricos en nutrientes.</li>
                                <li class="animate__animated animate__fadeInLeft">Incluye proteínas en cada comida para ayudar a desarrollar músculo.</li>
                                <li class="animate__animated animate__fadeInLeft">Consulta a un médico o nutricionista para un plan personalizado.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            `;
            break;
        case 'Peso normal':
            message += `
                <div class="col-md-12">
                    <div class="card mb-3">
                        <div class="card-body">
                            <h5 class="card-title">Peso normal</h5>
                            <ul>
                                <li class="animate__animated animate__fadeInLeft">Mantén una dieta equilibrada y saludable.</li>
                                <li class="animate__animated animate__fadeInLeft">Realiza actividad física regularmente.</li>
                                <li class="animate__animated animate__fadeInLeft">Controla tu peso regularmente para mantenerlo en el rango saludable.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            `;
            break;
        case 'Sobrepeso':
            message += `
                <div class="col-md-12">
                    <div class="card mb-3">
                        <div class="card-body">
                            <h5 class="card-title">Sobrepeso</h5>
                            <ul>
                                <li class="animate__animated animate__fadeInLeft">Reduce el consumo de alimentos procesados y azúcares.</li>
                                <li class="animate__animated animate__fadeInLeft">Incorpora más frutas y verduras en tu dieta.</li>
                                <li class="animate__animated animate__fadeInLeft">Realiza ejercicio regularmente, comenzando con actividades suaves y aumentando gradualmente.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            `;
            break;
        case 'Obesidad':
            message += `
                <div class="col-md-12">
                    <div class="card mb-3">
                        <div class="card-body">
                            <h5 class="card-title">Obesidad</h5>
                            <ul>
                                <li class="animate__animated animate__fadeInLeft">Consulta a un médico o nutricionista para un plan de pérdida de peso adecuado.</li>
                                <li class="animate__animated animate__fadeInLeft">Realiza cambios graduales en tu dieta, priorizando alimentos integrales y bajos en calorías.</li>
                                <li class="animate__animated animate__fadeInLeft">Inicia un programa de ejercicio, comenzando con caminatas y aumentando la intensidad con el tiempo.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            `;
            break;
        default:
            message = '<p>No hay recomendaciones disponibles.</p>';
            break;
    }
    
    message += '</div>';
    recommendations.innerHTML = message;
}


function displayPersonImage(category) {
    const personImage = document.getElementById('personImage');
    switch (category) {
        case 'Bajo peso':
            personImage.src = 'Bajo_peso.png'; 
            break;
        case 'Peso normal':
            personImage.src = 'Peso_normal.png'; 
            break;
        case 'Sobrepeso':
            personImage.src = 'sobrepeso.png'; 
            break;
        case 'Obesidad':
            personImage.src = 'obesidad.png'; 
            break;
        default:
            personImage.src = ''; 
            break;
    }
    personImage.style.display = category ? 'block' : 'none'; 
}
function displayInfoCards(weight, height) {
    const infoCardsContainer = document.getElementById('infoCards');
    infoCardsContainer.innerHTML = `
        <div class="col-md-12">
            <div class="card text-white bg-info mb-3">
                <div class="card-header">Información Ingresada</div>
                <div class="card-body">
                    <h5 class="card-title">Peso: ${weight} kg</h5>
                    <p class="card-text">Estatura: ${height} m</p>
                </div>
            </div>
        </div>
    `;
}
function getCategory(imc, ageGroup) {
    if (ageGroup === 'adult') {
        if (imc < 18.5) return 'Bajo peso';
        else if (imc < 24.9) return 'Peso normal';
        else if (imc < 29.9) return 'Sobrepeso';
        else return 'Obesidad';
    } else {
        // Categorías para niños (basado en percentiles)
        if (imc < 14) return 'Bajo peso';
        else if (imc < 19) return 'Peso normal';
        else if (imc < 22) return 'Sobrepeso';
        else return 'Obesidad';
    }
}

function getImcTable(ageGroup, userImc) {
    const categories = ageGroup === 'adult' ? 
    [
        { category: 'Bajo peso', imcRange: '< 18.5' },
        { category: 'Peso normal', imcRange: '18.5 - 24.9' },
        { category: 'Sobrepeso', imcRange: '25 - 29.9' },
        { category: 'Obesidad', imcRange: '≥ 30' }
    ] : 
    [
        { category: 'Bajo peso', imcRange: '< 14' },
        { category: 'Peso normal', imcRange: '14 - 19' },
        { category: 'Sobrepeso', imcRange: '19 - 22' },
        { category: 'Obesidad', imcRange: '≥ 22' }
    ];

    let tableHTML = '<table><tr><th>Categoría</th><th>Rango de IMC</th></tr>';
    categories.forEach(cat => {
        const highlightClass = (cat.category === getCategory(userImc, ageGroup)) ? 'highlight' : '';
        tableHTML += `<tr class="${highlightClass}"><td>${cat.category}</td><td>${cat.imcRange}</td></tr>`;
    });
    tableHTML += '</table>';
    return tableHTML;
}
