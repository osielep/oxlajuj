CREATE TABLE Idiomas.Genero (
	IdGenero INT PRIMARY KEY,
	TxtNombreGenero NVARCHAR(50) not null,
	--------------------------------------
	IntEstado tinyint DEFAULT 1,
	FechaIngreso datetime DEFAULT getdate(),
	IdUsuarioAdmin int NULL
)

CREATE TABLE Idiomas.Fidelidad (
	IdFidelidad TINYINT PRIMARY KEY,
	TxtNombreFidelidad NVARCHAR(50) not null,
	TxtDescripcion NVARCHAR(150) not null,
	--------------------------------------
	IntEstado tinyint DEFAULT 1,
	FechaIngreso datetime DEFAULT getdate(),
	IdUsuarioAdmin int NULL
)