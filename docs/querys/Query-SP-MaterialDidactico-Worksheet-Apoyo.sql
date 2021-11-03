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



/*
	+-------------------------------------------+
	|	Tipo:	Autor traudcción textual		|
	+-------------------------------------------+
	|	Autor:	Widman Esquivel					|
	|	Fecha:	01/11/2021						|
	+-------------------------------------------+
*/
CREATE PROC Idiomas.SP_AutorTexto (@IdPalabra INT)
AS
BEGIN

	select
		a.IdAutor, a.TxtNombreAutor, a.TxtApellidoAutor
	from
			Idiomas.TblAutor AS a, Idiomas.TblPalabra AS p
	where
			p.IdAutor = a.IdAutor and
			p.IdPalabra = @IdPalabra

END




/*
	+-------------------------------------------+
	|	Tipo:	Autor traudcción auditiva		|
	+-------------------------------------------+
	|	Autor:	Widman Esquivel					|
	|	Fecha:	02/11/2021						|
	+-------------------------------------------+
*/
CREATE PROC Idiomas.SP_ObtenerAUdio (@IdPalabra INT)
AS
BEGIN

	select
		e.IdAudioEspecial, e.Direccion, a.TxtNombreAutor, a.TxtApellidoAutor
	from
			Idiomas.AudioEspecial AS e, Idiomas.TblPalabra AS p, Idiomas.TblAutor AS a
	where
			e.IdPalabra = p.IdPalabra and
			e.IdAutor = a.IdAutor and
			p.IdPalabra = @IdPalabra
END



/*
	+-------------------------------------------+
	|	Tipo:	R.Usuarios activos				|
	+-------------------------------------------+
	|	Autor:	Widman Esquivel					|
	|	Fecha:	02/11/2021						|
	+-------------------------------------------+
*/
CREATE PROC Sesion.SP_RUsuariosActivos 
AS
BEGIN

	select u.IdUsuario, u.TxtNombreUsuario, u.TxtApellidoUsuario, u.TxtEmailUsuario, g.TxtNombreGenero
	from sesion.TblUsuario AS u, Idiomas.Genero AS g
	where u.IdGenero = g.IdGenero and
		u.IntEstado	= 1
END



/*
	+-------------------------------------------+
	|	Tipo:	R.Usuarios inactivos			|
	+-------------------------------------------+
	|	Autor:	Widman Esquivel					|
	|	Fecha:	02/11/2021						|
	+-------------------------------------------+
*/
CREATE PROC Sesion.SP_RUsuariosInactivos 
AS
BEGIN

	select u.IdUsuario, u.TxtNombreUsuario, u.TxtApellidoUsuario, u.TxtEmailUsuario, g.TxtNombreGenero
	from sesion.TblUsuario AS u, Idiomas.Genero AS g
	where u.IdGenero = g.IdGenero and
		u.IntEstado	= 0
END






/*
	+-------------------------------------------+
	|	Tipo:	R.Top 50 palabras				|
	+-------------------------------------------+
	|	Autor:	Widman Esquivel					|
	|	Fecha:	02/11/2021						|
	+-------------------------------------------+
*/
ALTER PROC Idiomas.SP_RTopLPalabras
AS
BEGIN

	select top 50
			p.IdPalabra, p.TxtPalabraEspanol, p.TxtPalabraIdiomaMaya, 
			i.TxtNombreIdioma, CONCAT(a.TxtNombreAutor, ' ', a.TxtApellidoAutor) AS Autor, 
			c.TxtNombreCtaGramatical, t.TxtNombreTipoPalabra, p.AcumuladoBusquedas
	from
			Idiomas.TblPalabra as p, Idiomas.TblIdioma as i, idiomas.TblCtaGramatical as c, 
			idiomas.TblTipoDePalabra as t, idiomas.TblAutor as a
	where
			p.IdIdioma = i.IdIdioma and
			p.IdCategoriaGramatical = c.IdCtaGramatical and
			p.IdTipoPalabra = t.IdTipoPalabra and
			p.IdAutor = a.IdAutor

END

exec Idiomas.SP_RTopLPalabras



/*
	+-------------------------------------------+
	|	Tipo:	R.Palabras populares			|
	+-------------------------------------------+
	|	Autor:	Widman Esquivel					|
	|	Fecha:	02/11/2021						|
	+-------------------------------------------+
*/
CREATE PROC Idiomas.SP_RPalabrasPopulares
AS
BEGIN

	select top 20
			p.IdPalabra, p.TxtPalabraEspanol, p.TxtPalabraIdiomaMaya, 
			i.TxtNombreIdioma, CONCAT(a.TxtNombreAutor, ' ', a.TxtApellidoAutor) AS Autor, 
			c.TxtNombreCtaGramatical, t.TxtNombreTipoPalabra, p.AcumuladoBusquedas
	from
			Idiomas.TblPalabra as p, Idiomas.TblIdioma as i, idiomas.TblCtaGramatical as c, 
			idiomas.TblTipoDePalabra as t, idiomas.TblAutor as a
	where
			p.IdIdioma = i.IdIdioma and
			p.IdCategoriaGramatical = c.IdCtaGramatical and
			p.IdTipoPalabra = t.IdTipoPalabra and
			p.IdAutor = a.IdAutor
	order by p.AcumuladoBusquedas desc

END

exec idiomas.SP_RPalabrasPopulares




/*
	+-------------------------------------------+
	|	Tipo:	R.Palabras por cateogría		|
	+-------------------------------------------+
	|	Autor:	Widman Esquivel					|
	|	Fecha:	02/11/2021						|
	+-------------------------------------------+
*/
CREATE PROC Idiomas.SP_RPalabrasPorCategoria (@IdCategoria INT)
AS
BEGIN

	select top 50
			p.IdPalabra, p.TxtPalabraEspanol, p.TxtPalabraIdiomaMaya, 
			i.TxtNombreIdioma, CONCAT(a.TxtNombreAutor, ' ', a.TxtApellidoAutor) AS Autor, 
			c.TxtNombreCtaGramatical, t.TxtNombreTipoPalabra, p.AcumuladoBusquedas
	from
			Idiomas.TblPalabra as p, Idiomas.TblIdioma as i, idiomas.TblCtaGramatical as c, 
			idiomas.TblTipoDePalabra as t, idiomas.TblAutor as a
	where
			p.IdIdioma = i.IdIdioma and
			p.IdCategoriaGramatical = c.IdCtaGramatical and
			p.IdTipoPalabra = t.IdTipoPalabra and
			p.IdAutor = a.IdAutor and
			t.IdTipoPalabra = @IdCategoria

END

	

exec Idiomas.SP_RPalabrasPorCategoria 10



/*
	+---------------------------------------+
	|	Tipo:	Agregar audio				|
	+---------------------------------------+
	|	Autor:	Widman Esquivel				|
	|	Fecha:	02/11/2021					|
	+---------------------------------------+
*/

CREATE PROC Idiomas.SP_AgregarAudio (
										@Direccion nvarchar(max),
										@IdPalabra int,
										@IdAutor int
								)
AS
DECLARE @FilasAfectadas	TINYINT,
		@Resultado		SMALLINT,
		@UltimoID		SMALLINT,
		@IdHojaEncabezado INT
BEGIN
	BEGIN TRAN

		SELECT @UltimoID = ISNULL(MAX(a.IdAudioEspecial),0) 
		FROM Idiomas.AudioEspecial AS a

	BEGIN TRY

		INSERT INTO idiomas.AudioEspecial (IdAudioEspecial, Direccion, IdPalabra, IdAutor)
		VALUES( @UltimoID + 1, '../recursos/pronunciacion/vocabulario/'+@Direccion+'.mp3', @IdPalabra, @IdAutor)

		SET @FilasAfectadas			= @@ROWCOUNT

	END TRY

	BEGIN CATCH
		SET @FilasAfectadas			= 0
	END CATCH

	--COMPROBAR EL ÉXITO O FRACASO DE LA TRANSACCION --

	IF (@FilasAfectadas > 0)
		BEGIN
			SET @Resultado			= @UltimoID + 1
			COMMIT
		END
	ELSE
		BEGIN
			SET @Resultado			= 0
			ROLLBACK
		END

		SELECT Resultado			= @Resultado
END

