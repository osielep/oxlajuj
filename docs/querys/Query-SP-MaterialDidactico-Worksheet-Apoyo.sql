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

	select c.IdHojaCuerpo, t.IdHojaSeccion, p.IdHojaPalabra, l.TxtPalabraEspanol, l.TxtPalabraIdiomaMaya

	from Aula.HojaPalabra AS p, Idiomas.TblPalabra AS l,  Aula.HojaSeccion AS t, Aula.HojaCuerpo AS c

	where	p.IdPalabra = l.IdPalabra and
			p.IdHojaSeccion = t.IdHojaSeccion and
			t.IdHojaSeccion = @IdSeccion and
			t.IdHojaCuerpo = c.IdHojaCuerpo

END

exec Aula.SP_ObtenerPalabrasPorSeccion 7


	select c.IdHojaCuerpo, t.IdHojaSeccion, p.IdHojaPalabra, l.TxtPalabraEspanol, l.TxtPalabraIdiomaMaya

	from Aula.HojaPalabra AS p, Idiomas.TblPalabra AS l,  Aula.HojaSeccion AS t, Aula.HojaCuerpo AS c

	where	p.IdPalabra = l.IdPalabra and
			p.IdHojaSeccion = t.IdHojaSeccion and
			t.IdHojaSeccion = 7 and
			t.IdHojaCuerpo = c.IdHojaCuerpo



/*
	+-------------------------------------------+
	|	Tipo:	Obtener titulo seccion			|
	+-------------------------------------------+
	|	Autor:	Widman Esquivel					|
	|	Fecha:	31/10/2021						|
	+-------------------------------------------+
*/
ALTER PROC Aula.SP_ObtenerTituloSeccion (@IdCuerpo INT,  @IdSeccion INT)
AS
BEGIN

	select
		c.IdHojaCuerpo, IdHojaSeccion, e.TxtNombreEvaluacion, e.TxtDescripcion
	from
			Aula.HojaSeccion as c, Aula.HojaCuerpo as t, aula.TipoEvaluacion as e
	where
			c.IdHojaCuerpo = t.IdHojaCuerpo and
			c. IdTipoEvaluacion = e.IdTipoEvaluacion
			and t.IdHojaCuerpo = @IdCuerpo
			and c.IdHojaSeccion = @IdSeccion
END

exec aula.SP_ObtenerTituloSeccion 6, 12
exec Aula.SP_ObtenerPalabrasPorSeccion 12


