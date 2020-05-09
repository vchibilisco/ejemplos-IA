package riesgo.financiero;

import net.sourceforge.jFuzzyLogic.FIS;
import net.sourceforge.jFuzzyLogic.plot.JFuzzyChart;
import net.sourceforge.jFuzzyLogic.rule.Variable;

public class Main {

	public static void main(String[] args) {
		String fileName = "flc/modelo.fcl";

		FIS fis = FIS.load(fileName);

		if (fis == null) {
			System.err.println("El archivo " + fileName + " no se pudo cargar.");
			return;
		}
		
		//JFuzzyChart.get().chart(fis);
		
		fis.setVariable("edad", 25);
		fis.setVariable("porcentaje_manejo", 50);
		
		fis.evaluate();
		
		Variable riesgoVariable = fis.getVariable("riesgo");

		System.out.println("Resultado "+riesgoVariable.getValue());
		
		JFuzzyChart.get().chart(riesgoVariable, riesgoVariable.getDefuzzifier(), true);
	}

}
