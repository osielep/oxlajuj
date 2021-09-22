
CREATE TABLE Aula.EspecializacionDetalle (
  [IdEspecializacionDetalle] int PRIMARY KEY,
  TxtNombreEspecializacion nvarchar(150) NOT NULL,
  [TxtDescripcion] nvarchar(500) NOT NULL,
  ---------------------------
  IntEstado tinyint DEFAULT 1,
  FechaIngreso datetime DEFAULT getdate(),
  IdUsuarioAdmin int NULL
);


CREATE TABLE Aula.EspecializacionProfesor (
	IdEspecializacionProfesor int PRIMARY KEY,
	IdEspecialziacionDetalle int NOT NULL,
	IdProfesor int NOT NULL,
	---------------------------
	IntEstado tinyint DEFAULT 1,
	FechaIngreso datetime DEFAULT getdate(),
	IdUsuarioAdmin int NULL
)

CREATE TABLE Aula.Profesor (
	IdProfesor int PRIMARY KEY,
	IdUsuario int NOT NULL,
	---------------------------
	IntEstado tinyint DEFAULT 1,
	FechaIngreso datetime DEFAULT getdate(),
	IdUsuarioAdmin int NULL
)

CREATE TABLE Aula.CursoDetalle (
	IdCursoDetalle int PRIMARY KEY,
	TxtNombreCurso nvarchar(200) NOT NULL,
	TxtDescripcion nvarchar(500) NOT NULL,
	TxtImagen nvarchar(150),
	IntNotaMinima decimal(5,2) NOT NULL,
	IntPrecio decimal(10,2)  NULL,
	IdEspecialziacionDetalle int NULL,
	--------------------------------------
	IntEstado tinyint DEFAULT 1,
	FechaIngreso datetime DEFAULT getdate(),
	IdUsuarioAdmin int NULL
)

CREATE TABLE Aula.CursoProfesor (
	IdCursoProfesor int PRIMARY KEY,
	IdCursoDetalle INT NOT NULL,
	IdProfesor INT NOT NULL,
	--------------------------------------
	IntEstado tinyint DEFAULT 1,
	FechaIngreso datetime DEFAULT getdate(),
	IdUsuarioAdmin int NULL
)


CREATE TABLE Aula.CursoCapitulo (
	IdCursoCapitulo INT PRIMARY KEY,
	IdCursoDetalle INT NOT NULL,
	IntNoCapitulo INT NOT NULL,
	TxtDescripcion nvarchar(300) NOT NULL,
	--------------------------------------
	IntEstado tinyint DEFAULT 1,
	FechaIngreso datetime DEFAULT getdate(),
	IdUsuarioAdmin int NULL
)


CREATE TABLE Aula.CapituloMaterial (
	IdCapituloMaterial INT PRIMARY KEY,
	IdCursoCapitulo INT NOT NULL,
	IntNoMaterial INT NOT NULL,
	IdTipoMaterial INT NOT NULL,
	TxtUbicacionMaterial nvarchar(150) NOT NULL,
	IntObligatorio TINYINT DEFAULT 1,
	IntPuntos INT,
	--------------------------------------
	IntEstado tinyint DEFAULT 1,
	FechaIngreso datetime DEFAULT getdate(),
	IdUsuarioAdmin int NULL
)


CREATE TABLE Aula.TipoMaterial (
	IdTipoMaterial INT PRIMARY KEY,
	TxtTipoMaterial nvarchar(50) NOT NULL,
	TxtDescripcion nvarchar(150) NOT NULL,
	--------------------------------------
	IntEstado tinyint DEFAULT 1,
	FechaIngreso datetime DEFAULT getdate(),
	IdUsuarioAdmin int NULL
)

CREATE TABLE Aula.EstudianteAsignacion (
	IdEstudianteAsignacion INT PRIMARY KEY,
	IdCursoDetalle INT NOT NULL,
	IdEstudiante INT NOT NULL,
	FechaDeAsignacion DATETIME DEFAULT getdate(),
	IdEstado INT NOT NULL,
	IntNotaFinal decimal(5,2) NOT NULL,
	IdCertificado INT DEFAULT 100001 NOT NULL,
	UbicacionCertificado nvarchar(150) NULL,
	--------------------------------------
	IntEstado tinyint DEFAULT 1,
	FechaIngreso datetime DEFAULT getdate(),
	IdUsuarioAdmin int NULL
)


CREATE TABLE Aula.EstudianteResultados (
	IdEstudianteResultados INT PRIMARY KEY,
	IdEstudianteAsignacion INT NOT NULL,
	IdCapituloMaterial INT NOT NULL,
	FechaInicio datetime DEFAULT getdate(),
	FechaFinallizacion datetime DEFAULT getdate(),
	IntPuntajeObtenido INT  NULL,
	--------------------------------------
	IntEstado tinyint DEFAULT 1,
	FechaIngreso datetime DEFAULT getdate(),
	IdUsuarioAdmin int NULL
)

CREATE TABLE Aula.Estudiante (
	IdEstudiante INT PRIMARY KEY,
	IntGrado INT NOT NULL,
	IdUsuario INT NOT NULL,
	--------------------------------------
	IntEstado tinyint DEFAULT 1,
	FechaIngreso datetime DEFAULT getdate(),
	IdUsuarioAdmin int NULL
)


CREATE TABLE Aula.Estado (
	IdEstado INT PRIMARY KEY,
	TxtNombreEstado nvarchar(50) NOT NULL,
	TxtDescripcion nvarchar(250) NOT NULL,
	--------------------------------------
	IntEstado tinyint DEFAULT 1,
	FechaIngreso datetime DEFAULT getdate(),
	IdUsuarioAdmin int NULL
)

CREATE TABLE Aula.HojaEncabezado (
	IdHojaEncabezado INT PRIMARY KEY,
	RefLogo NVARCHAR(250) NULL,
	TxtDocente NVARCHAR(250) NULL,
	FechaAplicacion NVARCHAR(200) NOT NULL,
	TxtTipoHoja NVARCHAR(100) NULL,
	--------------------------------------
	IntEstado tinyint DEFAULT 1,
	FechaIngreso datetime DEFAULT getdate(),
	IdUsuarioAdmin int NULL
)


CREATE TABLE Aula.HojaCuerpo (
	IdHojaCuerpo INT PRIMARY KEY,
	IdHojaEncabezado INT,
	--------------------------------------
	IntEstado tinyint DEFAULT 1,
	FechaIngreso datetime DEFAULT getdate(),
	IdUsuarioAdmin int NULL
)


CREATE TABLE Aula.HojaSeccion (
	IdHojaSeccion INT PRIMARY KEY,
	IdHojaCuerpo INT,
	IdTipoEvaluacion INT,
	--------------------------------------
	IntEstado tinyint DEFAULT 1,
	FechaIngreso datetime DEFAULT getdate(),
	IdUsuarioAdmin int NULL
)

CREATE TABLE Aula.HojaPalabra (
	IdHojaPalabra INT PRIMARY KEY,
	IdHojaSeccion INT,
	IdPalabra INT,
	--------------------------------------
	IntEstado tinyint DEFAULT 1,
	FechaIngreso datetime DEFAULT getdate(),
	IdUsuarioAdmin int NULL
)

CREATE TABLE Aula.TipoEvaluacion (
	IdTipoEvaluacion INT PRIMARY KEY,
	TxtNombreEvaluacion NVARCHAR(100) NOT NULL,
	TxtDescripcion NVARCHAR(250) NOT NULL,
	IntMaxPalabras INT NOT NULL,
	--------------------------------------
	IntEstado tinyint DEFAULT 1,
	FechaIngreso datetime DEFAULT getdate(),
	IdUsuarioAdmin int NULL
)

CREATE TABLE Aula.Dificultad (
	IdDificultad INT PRIMARY KEY,
	TxtNombre NVARCHAR(100) NOT NULL,
	--------------------------------------
	IntEstado tinyint DEFAULT 1,
	FechaIngreso datetime DEFAULT getdate(),
	IdUsuarioAdmin int NULL
)