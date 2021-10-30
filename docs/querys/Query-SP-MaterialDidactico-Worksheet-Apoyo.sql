/*
	+-------------------------------------------+
	|	Tipo:	Obtener 5 palabras aleatorias	|
	+-------------------------------------------+
	|	Autor:	Widman Esquivel					|
	|	Fecha:	12/10/2021						|
	+-------------------------------------------+
*/
ALTER PROC Idiomas.SP_CincoPalabrasAleatorias (@IdTipoPalabra INT)
AS
BEGIN

	select top 5
		p.IdPalabra, p.TxtPalabraEspanol, p.TxtPalabraIdiomaMaya, t.TxtNombreTipoPalabra

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



/*
	+-------------------------------------------+
	|	Tipo:	Obtener tipos de evaluación		|
	+-------------------------------------------+
	|	Autor:	Widman Esquivel					|
	|	Fecha:	29/10/2021						|
	+-------------------------------------------+
*/
CREATE PROC Aula.SP_ObtenerTipoEvaluacion
AS
BEGIN

	select IdTipoEvaluacion, TxtNombreEvaluacion, TxtDescripcion
	from Aula.TipoEvaluacion

END



/*
	+-------------------------------------------+
	|	Tipo:	Obtener palabras por seccion	|
	+-------------------------------------------+
	|	Autor:	Widman Esquivel					|
	|	Fecha:	29/10/2021						|
	+-------------------------------------------+
*/
ALTER PROC Aula.SP_ObtenerPalabrasPorSeccion (@IdSeccion INT)
AS
BEGIN

	select l.TxtPalabraEspanol, l.TxtPalabraIdiomaMaya
	from Aula.HojaPalabra AS p, Idiomas.TblPalabra AS l
	where p.IdPalabra = l.IdPalabra and
	IdHojaSeccion = @IdSeccion

END



exec idiomas.