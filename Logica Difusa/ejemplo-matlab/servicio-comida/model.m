fuzzyLogicDesigner('tipper_demo');
fprintf('Presione Enter para continuar \n');
pause;

out = readfis('tipper_demo');
result = evalfis([3 7], out);

fprintf('Resultado \n');
disp(result);