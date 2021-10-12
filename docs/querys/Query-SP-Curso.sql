/*
	+---------------------------------------+
	|	Tipo:	Agregar curso				|
	+---------------------------------------+
	|	Autor:	Widman Esquivel				|
	|	Fecha:	08/09/2021					|
	+---------------------------------------+
*/

CREATE PROC Aula.SPAgregarCursoDetalle (
	@TxtNombreCurso				NVARCHAR(200),
	@TxtDescripcion				NVARCHAR(500),
	@TxtImagen					NVARCHAR(150),
	@IntNotaMinima				DECIMAL(5,2),
	@IntPrecio					DECIMAL(10,2),
	@IdEspecializacionDetalle	INT,
	@IdDificultad				INT,
	@DuracionHoras				INT
)
AS

DECLARE 
	@FilasAfectadas				TINYINT,
	@Resultado					SMALLINT,
	@UltimoID					SMALLINT

BEGIN

	--Ver último registro
	BEGIN TRAN
		SELECT @UltimoID = ISNULL(MAX(a.IdUsuario),0) 
		FROM Sesion.TblUsuario AS a
	BEGIN TRY

	INSERT INTO Aula.CursoDetalle (
									IdCursoDetalle,
									TxtNombreCurso,
									TxtDescripcion,
									TxtImagen,
									IntNotaMinima,
									IntPrecio,
									IdEspecialziacionDetalle,
									IdDificultad,
									DuracionHoras
								  )
	VALUES						  (
									@UltimoID + 1,
									@TxtNombreCurso,
									@TxtDescripcion,
									@TxtImagen,
									@IntNotaMinima,
									@IntPrecio,
									@IdEspecializacionDetalle,
									@IdDificultad,
									@DuracionHoras
								  )
	
	SET @FilasAfectadas			= @@ROWCOUNT
	END TRY

	BEGIN CATCH
		SET @FilasAfectadas			= 0
	END CATCH

	--Confirmar o rechazar transacción
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





/*
	+---------------------------------------+
	|	Tipo:	Obtener detalle de curso	|
	+---------------------------------------+
	|	Autor:	Widman Esquivel				|
	|	Fecha:	11/10/2021					|
	+---------------------------------------+
*/
ALTER PROC Aula.SPObtenerDetalleCurso (@IdCurso INT)
AS
BEGIN

	select
		c.IdCursoDetalle, c.TxtNombreCurso, c.TxtDescripcion, 
		CONCAT(u.TxtNombreUsuario,' ', u.TxtApellidoUsuario) AS Profesor,
		c.FechaIngreso, c.DuracionHoras, d.TxtNombre, e.TxtNombreEspecializacion,
		c.TxtImagen, c.IntPrecio
	from
		Aula.CursoDetalle AS c,
		Aula.CursoProfesor AS p,
		Aula.Profesor AS f,
		Sesion.TblUsuario AS u,
		Aula.Dificultad AS d,
		Aula.EspecializacionDetalle e
	where
		c.IdCursoDetalle = p.IdCursoDetalle AND
		p.IdProfesor = f.IdProfesor AND
		f.IdUsuario = u.IdUsuario AND
		e.IdEspecializacionDetalle = c.IdEspecialziacionDetalle AND
		c.IdDificultad = d.IdDificultad AND
		c.IdCursoDetalle = @IdCurso

END



/*
	+---------------------------------------+
	|	Tipo:	Obtener capitulos de curso	|
	+---------------------------------------+
	|	Autor:	Widman Esquivel				|
	|	Fecha:	12/10/2021					|
	+---------------------------------------+
*/
CREATE PROC Aula.SPObtenerCapitulosDeCurso (@IdCurso INT)
AS
BEGIN

	select IdCursoCapitulo, TxtNombreCapitulo
	from aula.CursoCapitulo as c, aula.CursoDetalle d
	where c.IdCursoDetalle = d.IdCursoDetalle
	and d.IdCursoDetalle = @IdCurso

END


/*
	+-------------------------------------------+
	|	Tipo:	Obtener material de capitulo	|
	+-------------------------------------------+
	|	Autor:	Widman Esquivel					|
	|	Fecha:	12/10/2021						|
	+-------------------------------------------+
*/
ALTER PROC Aula.SPObtenerMaterialCapitulo (@IdCurso INT)
AS
BEGIN

	select p.IdCursoDetalle, m.IdCursoCapitulo, m.IdCapituloMaterial, m.TxtNombreMaterial, t.TxtTipoMaterial, t.TxtColorEtiqueta
	from aula.CursoDetalle as p, aula.CursoCapitulo as c, aula.CapituloMaterial as m, aula.TipoMaterial t
	where m.IdCursoCapitulo = t.IdTipoMaterial
	and m.IdCursoCapitulo = c.IdCursoCapitulo
	and c.IdCursoDetalle = p.IdCursoDetalle
	and c.IdCursoDetalle = @IdCurso

END