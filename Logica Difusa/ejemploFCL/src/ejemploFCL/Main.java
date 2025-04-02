package ejemploFCL;

import java.util.Scanner;

import net.sourceforge.jFuzzyLogic.FIS;
import net.sourceforge.jFuzzyLogic.plot.JFuzzyChart;
import net.sourceforge.jFuzzyLogic.rule.Variable;

public class Main {

	private static Scanner sc = new Scanner(System.in);

	public static void main(String[] args) {
		String fileName = "flc//tipper.fcl";
		
		FIS fis = FIS.load(fileName);
		
		if (fis == null) {
			System.err.println("El archivo "+fileName+" no se pudo cargar.");
			return;
		}

		JFuzzyChart.get().chart(fis);
		
		int service = setVariable(0, 9, "Servicio");
		
		
		fis.setVariable("service", service);

		int food = setVariable(0, 9, "Comida");
		
		fis.setVariable("food", food);


		System.out.println("Procesando...");
		fis.evaluate();
		
		Variable tipVariable = fis.getVariable("tip");

		System.out.println("Resultado "+tipVariable.getValue());
		
		JFuzzyChart.get().chart(tipVariable, tipVariable.getDefuzzifier(), true);

	}

	
	private static int setVariable(
			int limit0,
			int limit1,
			String variable
			)
	{
		int result;
		boolean retry = true;
		do {
			System.out.println("Por favor, ingrese un valor entre "+limit0+" y "+limit1+" para "+variable+".");
			result = sc.nextInt();
						
			if (limit0 <= result && result <= limit1) {
				retry = false;
			}

		} while(retry);

		return result;
	}
}
