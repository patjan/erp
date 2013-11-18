var	Program = 'ProcessSQL';

function Top()
{
	Put( '<div id=Content>' + BegForm( Program ));
	PutL( 'Header', 'Process SQL' );
	PutSpace();
}

function Bottom()
{
	PutEndBox();
	Put( EndForm() + '</div>' );
}

function Control( pResult )
{ 
	PutBegBox( 'BoxData' );
	Put2C( 'Result:'	, OutText( 'Result', pResult, '', 6 ));
	PutSpace( 3 );
}

function CheckForm( pForm, pSubmit )
{
	if( Submitted > 0 )
	{
		alert( GetDoubleSubmit() );
		return false;
	}

	Errors	= 0;
	Messages	= GetAlertHeader();

	if( Errors > 0 )
	{
		alert( Messages );
		return false;
	} else {
		Submitted ++;
		return true;
	}
}
