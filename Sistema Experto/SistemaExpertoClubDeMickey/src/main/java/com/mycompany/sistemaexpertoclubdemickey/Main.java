/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.sistemaexpertoclubdemickey;

import java.util.Scanner;

import com.github.cschen1205.ess.engine.EqualsClause;
import com.github.cschen1205.ess.engine.RuleInferenceEngine;

/**
 *
 * @author vicen
 */
public class Main {

    public static void main(String[] args) {
    	RuleInferenceEngine rie = BaseDeConocimiento.getRules();
    	
    	
    	System.out.println("Interfaz de Usuario");
    	System.out.println("___________________");
    	
    	Scanner sc = new Scanner(System.in);
    	System.out.println("Tiene zapatillas?");
    	String resultado = sc.next();
    	
    	rie.addFact(new EqualsClause("zapatillas", resultado));
    
    	System.out.println("Tiene zapatos?");
    	resultado = sc.next();
    	
    	rie.addFact(new EqualsClause("zapatos", resultado));
    	
    	System.out.println("Tiene pico?");
    	resultado = sc.next();
    	
    	rie.addFact(new EqualsClause("pico", resultado));
    
    	System.out.println("Tiene oreja redondas?");
    	resultado = sc.next();
    	
    	rie.addFact(new EqualsClause("orejaRedondas", resultado));
    	
    	System.out.println("Tiene collar?");
    	resultado = sc.next();
    	
    	rie.addFact(new EqualsClause("collar", resultado));
    	
    	System.out.println("before inference");
 	    System.out.println(rie.getFacts());
 	    System.out.println();
 	    
 	    rie.infer(); //foward chain
 	    
 	    System.out.println("after inference");
 	    System.out.println(rie.getFacts());
 	    System.out.println();
    }
    
}
