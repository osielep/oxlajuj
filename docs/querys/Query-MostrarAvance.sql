select * from aula.EstudianteAsignacion
select * from aula.estudianteresultados


DECLARE @TotalPuntosCapitulo INT;
DECLARE @TotalPuntosCapituloEstudiante INT;
DECLARE @AvanceCapitulo INT;
DECLARE @AvanceCurso INT;

	--Total de puntos por capitulo
	SELECT	@TotalPuntosCapitulo = sum(IntPuntos) 
	from	aula.CapituloMaterial 
	where	IdCursoCapitulo = 1

	--Total de puntos que lleva el estudiante por capitulo
	select	@TotalPuntosCapituloEstudiante = sum(IntPuntajeObtenido) 
	from	aula.EstudianteResultados AS r,
			aula.CapituloMaterial AS m,
			aula.CursoCapitulo AS c
	where	r.IdCapituloMaterial = m.IdCapituloMaterial
	and		m.IdCursoCapitulo = c.IdCursoCapitulo
	and		c.IdCursoCapitulo = 1
	and		r.IdEstudianteAsignacion = 1

SET @AvanceCapitulo = (100* @TotalPuntosCapituloEstudiante) / @TotalPuntosCapitulo
SELECT @AvanceCapitulo AS AvanceCapitulo1



DECLARE @TotalPuntosCapitulo2 INT;
DECLARE @TotalPuntosCapituloEstudiante2 INT;
DECLARE @AvanceCapitulo2 INT;
DECLARE @AvanceCurso2 INT;

	--Total de puntos por capitulo
	SELECT	@TotalPuntosCapitulo2 = sum(IntPuntos) 
	from	aula.CapituloMaterial 
	where	IdCursoCapitulo = 2

	--Total de puntos que lleva el estudiante por capitulo
	select	@TotalPuntosCapituloEstudiante2 = sum(IntPuntajeObtenido) 
	from	aula.EstudianteResultados AS r,
			aula.CapituloMaterial AS m,
			aula.CursoCapitulo AS c
	where	r.IdCapituloMaterial = m.IdCapituloMaterial
	and		m.IdCursoCapitulo = c.IdCursoCapitulo
	and		c.IdCursoCapitulo = 2
	and		r.IdEstudianteAsignacion = 1

SET @AvanceCapitulo2 = (100* @TotalPuntosCapituloEstudiante2) / @TotalPuntosCapitulo2
SELECT @AvanceCapitulo2 AS AvanceCapitulo2



SELECT @AvanceCapitulo
SELECT @TotalPuntosCapitulo
SELECT @TotalPuntosCapituloEstudiante
