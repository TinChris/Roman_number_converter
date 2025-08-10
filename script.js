    const numberInput = document.getElementById("number");  
    const convertBtn  = document.getElementById("convert-btn");
    const output      = document.getElementById("output");

    // --- Helper: Meldung anzeigen und ggf. nach Zeit leeren ---
    const showMsg = (msg, clearAfterMs = 5000) => {
      output.textContent = msg;
      output.classList.add("msg");
      if (clearAfterMs) {
        setTimeout(() => {
          output.textContent = "";
          output.classList.remove("msg");
        }, clearAfterMs);
      }
    };

    // --- Umwandlung ---
    const convertToRoman = (value) => {
      let n = value;
      let result = "";

      const romanPairs = [
        [1000, "M"],
        [900,  "CM"],
        [500,  "D"],
        [400,  "CD"],
        [100,  "C"],
        [90,   "XC"],
        [50,   "L"],
        [40,   "XL"],
        [10,   "X"],
        [9,    "IX"],
        [5,    "V"],
        [4,    "IV"],
        [1,    "I"]
      ];

      for (const [wert, symbol] of romanPairs) {
        while (n >= wert) {
          result += symbol;
          n -= wert;
        }
      }
      return result;
    };

    // --- Validieren → Konvertieren → Ausgeben ---
    const handleConvert = () => {
      const raw = numberInput.value.trim();
      const n = parseInt(raw, 10);

      if (Number.isNaN(n)) {
        showMsg("Please enter a valid number");
        return;
      }
      if (!Number.isInteger(n) || n < 0) {
        showMsg("Please enter a number greater than or equal to 1");
        return;
      }
      if (!Number.isInteger(n) || n > 3999) {
        showMsg("Please enter a number less than or equal to 3999");
        return;
      }

      const roman = convertToRoman(n);
      output.classList.remove("msg");
      output.textContent = roman; // hier kein Auto-Clear – bleibt stehen
    };

    convertBtn.addEventListener("click", handleConvert);

    // Enter-Taste im Input löst auch die Konvertierung aus
    numberInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleConvert();
      }
    });
