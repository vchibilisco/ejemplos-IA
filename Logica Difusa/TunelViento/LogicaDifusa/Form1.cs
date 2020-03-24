using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace LogicaDifusa
{
    public partial class Form1 : Form
    {
        private double gravedad;
        private double posY;
        private double velY;
        private int x, y;
        private double objY;
        private double ventilador;
        private double distancia;
        private Random random = new Random();

        public Form1()
        {
            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            gravedad = 9.81;
            velY = 0.0;
            x = 400;
            posY = random.Next(150 , 450);
            y=(int)posY;
            ventilador = (double)random.Next(1,120)/10.0;
            objY = 300;
        }

        private void Form1_Paint(object sender, PaintEventArgs e)
        {
            e.Graphics.DrawRectangle(Pens.Blue, 350,100,100,450);
            e.Graphics.DrawEllipse(Pens.Red, x-16,y-16,32,32);
            e.Graphics.DrawEllipse(Pens.Black,x-32,(int)objY-16,64,32);
        }

        private void timer1_Tick(object sender, EventArgs e)
        {
            double caos = 0.0;

            Difusa();

            caos = (double)(random.Next(100) - 50) / 10.0;
            velY += ((gravedad - ventilador + caos) * 0.01);
            posY += velY;
            y = (int)(posY);

            this.velocidadLbl.Text = posY.ToString();
            this.distanciaLbl.Text = distancia.ToString();

            this.Invalidate();
        }

        private void Difusa()
        {
            double centrado, cercaA, normalA, lejosA, cercaB, normalB, lejosB;

            // Obtiene valor discreto
            distancia = objY - posY;

            // Evalua el valor discreto y determina la membresia en cada funcion
            centrado = FuncionesMembresia.FuncionTriangulo(distancia, -40.0, 0.0, 40.0);

            cercaA = FuncionesMembresia.FuncionTrapezoide(distancia, 20.0, 80.0, 120.0, 180.0);

            normalA = FuncionesMembresia.FuncionTrapezoide(distancia, 120.0, 160.0, 240.0, 280.0);

            lejosA = FuncionesMembresia.FuncionGrado(distancia, 240.0, 300.0);

            cercaB = FuncionesMembresia.FuncionTrapezoide(distancia, -180.0, -120.0, -80.0, -20.0);

            normalB = FuncionesMembresia.FuncionTrapezoide(distancia, -280.0, -240.0, -160.0, -120.0);

            lejosB = FuncionesMembresia.FuncionGradoInversa(distancia, -300.0, -240.0);

            // Defucifica los valores obtenidos en base a pesos
            ventilador = (centrado*9.8 + cercaA*4.0 + normalA*2.0 + lejosA*1.0 + cercaB*14.0 + normalB*15.5 + lejosB*18.0) /
                (centrado + cercaA + normalA + lejosA + cercaB + normalB + lejosB);
        }

        private void button1_Click(object sender, EventArgs e)
        {
            timer1.Enabled = true;
        }

        private void button2_Click(object sender, EventArgs e)
        {
            timer1.Enabled = false;
        }
    }
}
