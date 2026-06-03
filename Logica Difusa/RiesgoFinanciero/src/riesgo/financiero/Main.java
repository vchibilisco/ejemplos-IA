package riesgo.financiero;

import net.sourceforge.jFuzzyLogic.FIS;
import net.sourceforge.jFuzzyLogic.plot.JFuzzyChart;
import net.sourceforge.jFuzzyLogic.rule.Variable;

public class Main {

	public static void main(String[] args) {
		// Construir la ruta correcta desde el directorio de trabajo actual
		String fileName = "flc/modelo.fcl";
		java.io.File file = new java.io.File(fileName);
		
		// Si no existe, intentar desde el directorio del proyecto
		if (!file.exists()) {
			fileName = "Logica Difusa/RiesgoFinanciero/flc/modelo.fcl";
			file = new java.io.File(fileName);
		}

		FIS fis = FIS.load(fileName);

		if (fis == null) {
			System.err.println("El archivo " + fileName + " no se pudo cargar.");
			System.err.println("Directorio de trabajo: " + System.getProperty("user.dir"));
			return;
		}
		
		JFuzzyChart.get().chart(fis);
		
		fis.setVariable("edad", 25);
		fis.setVariable("porcentaje_manejo", 50);
		
		fis.evaluate();
		
		Variable riesgoVariable = fis.getVariable("riesgo");

		System.out.println("Resultado "+riesgoVariable.getValue());
		
		//JFuzzyChart.get().chart(riesgoVariable, riesgoVariable.getDefuzzifier(), true);
	}

}
