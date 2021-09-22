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
	|	Tipo:	Obtener curso				|
	+---------------------------------------+
	|	Autor:	Widman Esquivel				|
	|	Fecha:	08/09/2021					|
	+---------------------------------------+
*/
CREATE PROC Aula.SPObtenerCursoDetalle (

)

