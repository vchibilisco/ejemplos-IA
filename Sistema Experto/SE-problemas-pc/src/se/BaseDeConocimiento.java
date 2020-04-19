package se;

import com.github.cschen1205.ess.engine.EqualsClause;
import com.github.cschen1205.ess.engine.KieRuleInferenceEngine;
import com.github.cschen1205.ess.engine.NegationClause;
import com.github.cschen1205.ess.engine.Rule;
import com.github.cschen1205.ess.engine.RuleInferenceEngine;

public class BaseDeConocimiento {

    public static RuleInferenceEngine getRules(boolean showRules) {
        RuleInferenceEngine rie = new KieRuleInferenceEngine();

        problemaMemoriaRam(rie);
        problemaDiscoDuro(rie);
        problemaPlacaMother(rie);

        if (showRules) {
            System.out.println("Reglas:");
            System.out.println("------");
            rie.getRules().forEach((r) -> {
                System.out.println(r.toString());
            });
            System.out.println("===============================");
        }

        return rie;
    }

    private static void problemaMemoriaRam(RuleInferenceEngine rie) {
        Rule rule = new Rule("MEMORIA_RAM_Regla_1");
        rule.addAntecedent(new EqualsClause(Hechos.PITIDO_LARGO, "si"));
        rule.addAntecedent(
                new NegationClause(new EqualsClause(Hechos.PANTALLA_ENCIENDE, "si"))
        );
        rule.setConsequent(new EqualsClause(Hechos.PROBLEMA_MEMORIA_RAM, "si"));
        rie.addRule(rule);

        rule = new Rule("MEMORIA_RAM_Regla_2");
        rule.addAntecedent(
                new NegationClause(new EqualsClause(Hechos.PANTALLA_ENCIENDE, "si"))
        );
        rule.addAntecedent(new EqualsClause(Hechos.TRES_PITIDOS_CORTOS, "si"));
        rule.setConsequent(new EqualsClause(Hechos.PROBLEMA_MEMORIA_RAM, "si"));
        rie.addRule(rule);

        rule = new Rule("MEMORIA_RAM_Regla_3");
        rule.addAntecedent(new EqualsClause(Hechos.SO_MSJ_FALLA_PROTECCION_GRAL, "si"));
        rule.addAntecedent(new EqualsClause(Hechos.PC_REINICIOS, "si"));
        rule.setConsequent(new EqualsClause(Hechos.PROBLEMA_MEMORIA_RAM, "si"));
        rie.addRule(rule);

        rule = new Rule("MEMORIA_RAM_Regla_4");
        rule.addAntecedent(new EqualsClause(Hechos.SO_CUELGA, "si"));
        rule.addAntecedent(new EqualsClause(Hechos.SO_MSJ_FALLA_PROTECCION_GRAL, "si"));
        rule.setConsequent(new EqualsClause(Hechos.PROBLEMA_MEMORIA_RAM, "si"));
        rie.addRule(rule);
    }

    private static void problemaDiscoDuro(RuleInferenceEngine rie) {
        Rule rule = new Rule("DISCO_DURO_Regla_1");
        rule.addAntecedent(new EqualsClause(Hechos.PC_LENTA, "si"));
        rule.addAntecedent(new EqualsClause(Hechos.PC_REINICIOS, "si"));
        rule.setConsequent(new EqualsClause(Hechos.PROBLEMA_DISCO_DURO, "si"));
        rie.addRule(rule);

        rule = new Rule("DISCO_DURO_Regla_2");
        rule.addAntecedent(new EqualsClause(Hechos.PANTALLA_AZUL, "si"));
        rule.addAntecedent(new EqualsClause(Hechos.ERROR_GRABAR_ARCHIVO, "si"));
        rule.setConsequent(new EqualsClause(Hechos.PROBLEMA_DISCO_DURO, "si"));
        rie.addRule(rule);

        rule = new Rule("DISCO_DURO_Regla_3");
        rule.addAntecedent(new EqualsClause(Hechos.RUIDO_METALICO, "si"));
        rule.addAntecedent(new EqualsClause(Hechos.PANTALLA_AZUL, "si"));
        rule.setConsequent(new EqualsClause(Hechos.PROBLEMA_DISCO_DURO, "si"));
        rie.addRule(rule);

        rule = new Rule("DISCO_DURO_Regla_4");
        rule.addAntecedent(new EqualsClause(Hechos.SCANDISK_ACTIVADO, "si"));
        rule.addAntecedent(new EqualsClause(Hechos.PC_LENTA, "si"));
        rule.setConsequent(new EqualsClause(Hechos.PROBLEMA_DISCO_DURO, "si"));
        rie.addRule(rule);
    }

    private static void problemaPlacaMother(RuleInferenceEngine rie) {
        Rule rule = new Rule("PLACA_MOTHER_Regla_1");
        rule.addAntecedent(new EqualsClause(Hechos.PITIDOS_CONTINUOS, "si"));
        rule.addAntecedent(
                new NegationClause(new EqualsClause(Hechos.PANTALLA_ENCIENDE, "si"))
        );
        rule.setConsequent(new EqualsClause(Hechos.PROBLEMA_PLACA_MOTHER, "si"));
        rie.addRule(rule);

        rule = new Rule("PLACA_MOTHER_Regla_2");
        rule.addAntecedent(
                new NegationClause(new EqualsClause(Hechos.PANTALLA_ENCIENDE, "si"))
        );
        rule.addAntecedent(
                new NegationClause(new EqualsClause(Hechos.SO_INICIA, "si"))
        );
        rule.setConsequent(new EqualsClause(Hechos.PROBLEMA_PLACA_MOTHER, "si"));
        rie.addRule(rule);

        rule = new Rule("PLACA_MOTHER_Regla_3");
        rule.addAntecedent(new EqualsClause(Hechos.PC_ENCIENDE, "si"));
        rule.addAntecedent(
                new NegationClause(new EqualsClause(Hechos.SO_INICIA, "si"))
        );
        rule.setConsequent(new EqualsClause(Hechos.PROBLEMA_PLACA_MOTHER, "si"));
        rie.addRule(rule);

        rule = new Rule("PLACA_MOTHER_Regla_4");
        rule.addAntecedent(new EqualsClause(Hechos.PC_ENCIENDE, "si"));
        rule.addAntecedent(
                new NegationClause(new EqualsClause(Hechos.MONITOR_IMAGEN, "si"))
        );
        rule.setConsequent(new EqualsClause(Hechos.PROBLEMA_PLACA_MOTHER, "si"));
        rie.addRule(rule);

        rule = new Rule("PLACA_MOTHER_Regla_5");
        rule.addAntecedent(new EqualsClause(Hechos.SO_INICIA, "si"));
        rule.addAntecedent(new EqualsClause(Hechos.PC_REINICIOS, "si"));
        rule.setConsequent(new EqualsClause(Hechos.PROBLEMA_PLACA_MOTHER, "si"));
        rie.addRule(rule);
    }
}
