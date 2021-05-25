% Un avión está sujeto a turbulencias, las que cuasan que el avión
% baje y suba bruscamente formando un ángulo respecto  a su
% línea de vuelo. Se desea un sistema de control difuso
% para que un piloto automático responda al problema 
% de turbulencias ajustando la posición del timón de la aeronave.

fuzzyLogicDesigner('pavion_model');
fprintf('Presione Enter para continuar \n');
pause;

out = readfis('pavion_model');
result = evalfis([3 7], out);

fprintf('Resultado \n');
disp(result);