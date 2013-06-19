$. datepicker.regional ['pt'] = {
closeText: 'Close'
prevText: '<Anterior'
nextText: 'Next>'
currentText: 'Hoje'
monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho »,
'Julho', 'agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
monthNamesShort: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho »
'Julho', 'agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
dayNames:
dayNamesShort: ['Su', 'IPA', 'Tu', 'Qua', 'Qui', 'Sex', 'Sáb']
dayNamesMin: ['Dom', 'Seg', 'Ter', 'Qua', 'Th', 'padre', 'Sa'],
weekHeader: 'Não'
dateFormat: 'dd.mm.yy'
firstDay: 1
isRTL: false,
showMonthAfterYear: false,
yearSuffix:''
};
$. datepicker.setDefaults ($ datepicker.regional ['pt'].);


$. timepicker.regional ['pt'] = {
timeOnlyTitle: 'Escolha uma hora'
timeText: 'Time'
hourText: 'Watch'
minuteText: 'Minutes'
secondText: 'segundos'
millisecText: 'milissegundos'
timezoneText: "Todos os Tempos"
currentText: 'Agora'
closeText: 'Close'
timeFormat: 'HH: mm',
amNames: ['AM', 'A'],
pmNames: ['PM', 'P'],
isRTL: false
};
$. timepicker.setDefaults ($ timepicker.regional ['pt'].);