document.addEventListener("DOMContentLoaded", function () {
  const formElement = document.getElementById("formio");
  const formSchema = {
    components: [
      {
        type: "number",
        label: "Масса куска в граммах",
        key: "weight",
        defaultValue: 1000,
        input: true,
      },
      {
        type: "number",
        label: "Диаметр куска в сантиметрах",
        key: "diameter",
        defaultValue: 8,
        input: true,
      },
      {
        type: "number",
        label: "Нитрит натрия в посолочной смеси, %",
        key: "nitrite",
        defaultValue: 0.6,
        input: true,
      },
      {
        type: "number",
        label: "Требуемый % соли",
        key: "saltPercentage",
        defaultValue: 2.5,
        input: true,
      },
      {
        type: "number",
        label: "Требуемый % сахара",
        key: "sugarPercentage",
        defaultValue: 1,
        input: true,
      },
      {
        type: "number",
        label: "Требуемый % специй",
        key: "spicePercentage",
        defaultValue: 1,
        input: true,
      },
      {
        type: "number",
        label: "Желаемый PPM нитрита натрия в продукте",
        key: "ppm",
        defaultValue: 150,
        input: true,
      },
      {
        type: "button",
        action: "event",
        label: "Вычислить",
        theme: "primary",
      },
    ],
  };

  Formio.createForm(formElement, formSchema).then(function (form) {
    form.on("customEvent", function (submission) {
      const data = submission.data;
      console.log("Data: ", data);
      const weight = parseFloat(data.weight);
      let saltGrams = weight * (data.saltPercentage / 100);
      const sugarGrams = weight * (data.sugarPercentage / 100);
      const spiceGrams = weight * (data.spicePercentage / 100);
      const nitriteGrams =
        (data.ppm * weight) / (1000000 * (data.nitrite / 100));
      const curingDays = Math.ceil(
        1.25 * (data.diameter / 2.54) * (data.diameter / 2.54)
      );

      saltGrams = saltGrams - nitriteGrams > 0 ? saltGrams - nitriteGrams : 0;
      const resultsHtml = `Нитритная соль(г): ${nitriteGrams.toFixed(2)}<br>
                               Поваренная/Морская соль(г): ${saltGrams.toFixed(
                                 2
                               )}<br>
                               Сахар(г): ${sugarGrams.toFixed(2)}<br>
                               Специи(г): ${spiceGrams.toFixed(2)}<br>
                               Длительность посола(дней): ${curingDays}`;
      document.getElementById("results").innerHTML = resultsHtml;
    });
  });
});
