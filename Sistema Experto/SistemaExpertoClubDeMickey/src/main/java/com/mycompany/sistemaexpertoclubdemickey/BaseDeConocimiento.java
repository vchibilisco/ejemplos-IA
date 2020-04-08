/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.sistemaexpertoclubdemickey;

import com.github.cschen1205.ess.engine.Clause;
import com.github.cschen1205.ess.engine.EqualsClause;
import com.github.cschen1205.ess.engine.KieRuleInferenceEngine;
import com.github.cschen1205.ess.engine.Rule;
import com.github.cschen1205.ess.engine.RuleInferenceEngine;

/**
 *
 * @author vicen
 */
public class BaseDeConocimiento {
    public static RuleInferenceEngine getRules() {
    	RuleInferenceEngine rie = new KieRuleInferenceEngine();
    	
    	/**
    	 * Regla 1
    	 * Determina si tiene zapatillas
    	 */
    	Rule rule = new Rule("ReglaUno");
    	
    	Clause ant1 = new EqualsClause("zapatillas", "si" );
    	Clause ant2 = new EqualsClause("zapatos", "no" );
    	Clause cons = new EqualsClause("resultadoCalzado", "TieneZapatillas" );
    	rule.addAntecedent(ant1);
    	rule.addAntecedent(ant2);
    	rule.setConsequent(cons);
    	rie.addRule(rule);
    	
    	/**
    	 * Regla 2
    	 * Determina si tiene zapatos
    	 */
    	rule = new Rule("ReglaDos");
    	ant1 = new EqualsClause("zapatillas", "no" );
    	ant2 = new EqualsClause("zapatos", "si" );
    	cons = new EqualsClause("resultadoCalzado", "TieneZapatos" );
    	rule.addAntecedent(ant1);
    	rule.addAntecedent(ant2);
    	rule.setConsequent(cons);
    	rie.addRule(rule);
    	
    	/**
    	 * Regla 3
    	 * Determina si no tiene calzado
    	 */
    	rule = new Rule("ReglaTres");
    	ant1 = new EqualsClause("zapatillas", "no" );
    	ant2 = new EqualsClause("zapatos", "no" );
    	cons = new EqualsClause("resultadoCalzado", "NoTieneCalzado" );
    	rule.addAntecedent(ant1);
    	rule.addAntecedent(ant2);
    	rule.setConsequent(cons);
    	rie.addRule(rule);
    	
    	/**
    	 * Regla 4
    	 * Determina si es Daysi
    	 */
    	rule = new Rule("ReglaCuatro");
    	ant1 = new EqualsClause("resultadoCalzado", "TieneZapatillas" );
    	ant2 = new EqualsClause("pico", "si" );
    	cons = new EqualsClause("resultadoPersonaje", "Daysi" );
    	rule.addAntecedent(ant1);
    	rule.addAntecedent(ant2);
    	rule.setConsequent(cons);
    	rie.addRule(rule);
    	
    	/**
    	 * Regla 5
    	 * Determina si es Minnie
    	 */
    	rule = new Rule("ReglaCinco");
    	ant1 = new EqualsClause("resultadoCalzado", "TieneZapatillas" );
    	ant2 = new EqualsClause("pico", "no" );
    	cons = new EqualsClause("resultadoPersonaje", "Minnie" );
    	rule.addAntecedent(ant1);
    	rule.addAntecedent(ant2);
    	rule.setConsequent(cons);
    	rie.addRule(rule);
    	
    	/**
    	 * Regla 6
    	 * Determina si es Mickey
    	 */
    	rule = new Rule("ReglaSeis");
    	ant1 = new EqualsClause("resultadoCalzado", "TieneZapatos" );
    	ant2 = new EqualsClause("orejaRedondas", "si" );
    	cons = new EqualsClause("resultadoPersonaje", "Mickey" );
    	rule.addAntecedent(ant1);
    	rule.addAntecedent(ant2);
    	rule.setConsequent(cons);
    	rie.addRule(rule);
    	
    	/**
    	 * Regla 7
    	 * Determina si es Mickey
    	 */
    	rule = new Rule("ReglaSiete");
    	ant1 = new EqualsClause("resultadoCalzado", "TieneZapatos" );
    	ant2 = new EqualsClause("orejaRedondas", "no" );
    	cons = new EqualsClause("resultadoPersonaje", "Goofy" );
    	rule.addAntecedent(ant1);
    	rule.addAntecedent(ant2);
    	rule.setConsequent(cons);
    	rie.addRule(rule);
    	
    	/**
    	 * Regla 8
    	 * Determina si es Pluto
    	 */
    	rule = new Rule("ReglaOcho");
    	ant1 = new EqualsClause("resultadoCalzado", "NoTieneCalzado" );
    	ant2 = new EqualsClause("collar", "si" );
    	cons = new EqualsClause("resultadoPersonaje", "Pluto" );
    	rule.addAntecedent(ant1);
    	rule.addAntecedent(ant2);
    	rule.setConsequent(cons);
    	rie.addRule(rule);
    	
    	/**
    	 * Regla 9
    	 * Determina si es Donald
    	 */
    	rule = new Rule("ReglaNueve");
    	ant1 = new EqualsClause("resultadoCalzado", "NoTieneCalzado" );
    	ant2 = new EqualsClause("collar", "no" );
    	cons = new EqualsClause("resultadoPersonaje", "Donald" );
    	rule.addAntecedent(ant1);
    	rule.addAntecedent(ant2);
    	rule.setConsequent(cons);
    	rie.addRule(rule);
    	
    	System.out.println("Reglas:");
    	System.out.println("------");
    	for (Rule r : rie.getRules()) {
			System.out.println(r.toString());
		}
    	System.out.println("===============================");

    	return rie;
    }
}
