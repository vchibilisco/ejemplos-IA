using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LogicaDifusa
{
    class FuncionesMembresia
    {
        public static double FuncionTriangulo(double distancia, double p1, double p2, double p3)
        {
            double membresia = 0.0;

            if (distancia <= p1)
                membresia = 0.0;

            else if (distancia > p1 && distancia <= p2)
                membresia = (distancia / (p2 - p1)) - (p1 / (p2 - p1));

            else if (distancia > p2 && distancia <= p3)
                membresia = (distancia / (p3 - p2)) + (p3 / (p3 - p2));

            else if (distancia > p3)
                membresia = 0.0;

            return membresia;
        }

        public static double FuncionTrapezoide(double distancia, double p1, double p2, double p3, double p4)
        {
            double membresia = 0.0;

            if (distancia <= p1)
                membresia = 0.0;

            else if (distancia > p1 && distancia <= p2)
                membresia = (distancia / (p2 - p1)) - (p1 / (p2 - p1));

            else if (distancia > p2 && distancia <= p3)
                membresia = 1.0;

            else if (distancia > p3 && distancia <= p4)
                membresia = -(distancia / (p4 - p3)) + (p4 / (p4 - p3));

            else if (distancia > p4)
                membresia = 0.0;

            return membresia;
        }

        public static double FuncionGrado(double distancia, double p1, double p2)
        {
            double membresia = 0.0;

            if (distancia <= p1)
                membresia = 0.0;

            else if (distancia > p1 && distancia < p2)
                membresia = (distancia / (p2 - p1)) - (p1 / (p2 - p1));

            else if (distancia >= p2)
                membresia = 1.0;


            return membresia;
        }

        public static double FuncionGradoInversa(double distancia, double p1, double p2)
        {
            double membresia = 0.0;

            if (distancia <= p1)
                membresia = 1.0;

            else if (distancia > p1 && distancia <= p2)
                membresia = -(distancia / (p2 - p1)) - (p2 / (p2 - p1));

            else if (distancia >= p2)
                membresia = 0.0;


            return membresia;
        }
    }
}
