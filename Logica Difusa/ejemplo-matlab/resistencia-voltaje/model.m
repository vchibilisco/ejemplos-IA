fuzzyLogicDesigner('model');
fprintf('Presione Enter para continuar \n');
pause;

out = readfis('model');
result = evalfis([0.1 0.4], out);

fprintf('Resultado \n');
disp(result);