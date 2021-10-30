/*
	+-------------------------------------------+
	|	Tipo:	Obtener 5 palabras aleatorias	|
	+-------------------------------------------+
	|	Autor:	Widman Esquivel					|
	|	Fecha:	12/10/2021						|
	+-------------------------------------------+
*/
CREATE PROC Idiomas.SP_CincoPalabrasAleatorias (@IdTipoPalabra INT)
AS
BEGIN

	select top 5
		p.TxtPalabraEspanol, p.TxtPalabraIdiomaMaya, t.TxtNombreTipoPalabra

	from
			Idiomas.TblPalabra AS p, Idiomas.TblTipoDePalabra AS t

	where
			(p.IdTipoPalabra = t.IdTipoPalabra) and
			(t.IdTipoPalabra = @IdTipoPalabra)

	order by NEWID()

END



/*
	+-------------------------------------------+
	|	Tipo:	Obtener categorias de palabras	|
	+-------------------------------------------+
	|	Autor:	Widman Esquivel					|
	|	Fecha:	29/10/2021						|
	+-------------------------------------------+
*/
CREATE PROC Idiomas.SP_ObtenerCategorias
AS
BEGIN

	select IdTipoPalabra, TxtNombreTipoPalabra
	from idiomas.TblTipoDePalabra

END

exec idiomas.SP_ObtenerCategorias

