/*
	+-------------------------------------------+
	|	Tipo:	PROCEDURE Asignar curso			|
	+-------------------------------------------+
	|	Autor:	Widman Esquivel					|
	|	Fecha:	22/09/2021						|
	+-------------------------------------------+
*/

ALTER PROC Aula.SPAsignarCurso ( @IdCurso INT, @IdEstudiante INT )
AS

DECLARE @FilasAfectadas		TINYINT,
		@Resultado			SMALLINT,
		@UltimoID			SMALLINT,
		@EstadoASignacion	INT

BEGIN	

	SELECT	@EstadoASignacion = Aula.FNVerificarAsignacion (@IdCurso, @IdEstudiante)

	IF	(@EstadoASignacion = 100)
		begin

		BEGIN TRAN

			SELECT @UltimoID = ISNULL(MAX(a.IdEstudianteAsignacion),0) 
			FROM Aula.EstudianteAsignacion AS a


		BEGIN TRY

			INSERT INTO Aula.EstudianteAsignacion (IdEstudianteAsignacion, IdCursoDetalle, IdEstudiante)
			VALUES (@UltimoID + 1, @IdCurso, @IdEstudiante)
			SET @FilasAfectadas	= @@ROWCOUNT

		END TRY

		BEGIN CATCH
			SET @FilasAfectadas	= 0
		END CATCH
		

		IF (@FilasAfectadas > 0)
			BEGIN
				SET @Resultado = @UltimoID + 1
				COMMIT
			END
		ELSE
			BEGIN
				SET @Resultado = 0
				ROLLBACK
			END
		end

	ELSE	
		SET @Resultado = 0

	SELECT @Resultado AS CodigoResultado

END


EXEC Aula.SPAsignarCurso 1, 2