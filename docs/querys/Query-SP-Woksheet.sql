
/*
	Tipo:	Ver Worksheet Header by Id
	-------------------------------------
	Autor:	Widman Esquivel
	Fecha:	29/07/2021
	-------------------------------------
*/



ALTER PROC SPWorksheetHeaderView ( @IdWorksheetHeader INT )
AS
BEGIN
	
	SELECT
		ROW_NUMBER() OVER (ORDER BY h.IdWorksheetHeader ) AS NoWorksheet,
		h.IdWorksheetHeader,
		h.ImgLogo,
		h.TxtDocente,
		h.FechaAplicacion,
		h.TxtTipoWorksheet
	FROM
		Aula.TblWorksheetHeader AS h
	WHERE
		h.IdWorksheetHeader = @IdWorksheetHeader

END



/*
	Tipo:	Ver Worksheet Body by Id
	-------------------------------------
	Autor:	Widman Esquivel
	Fecha:	29/07/2021
	-------------------------------------
*/

CREATE PROC SPWorksheetBodyView ( @IdWorksheetHeader INT )
AS
BEGIN

	SELECT

		ROW_NUMBER() OVER (ORDER BY t.TxtNombreEvaluacion) AS NoSerie,
		t.TxtNombreEvaluacion,
		t.TxtDescripcion,
		STRING_AGG( CONCAT (i.TxtPalabraEspanol, ' / ', i.TxtPalabraIdiomaMaya), ' --- ' ) AS Palabras

	FROM

		Aula.TblTipoDeEvaluacion t,
		Aula.TblWorksheetBody b,
		Aula.TblWorksheetHeader h,
		Aula.TblWorksheetPalabra p,
		Aula.TblWorksheetSeccion s,
		Idiomas.TblPalabra i

	WHERE
	
		h.IdWorksheetHeader = b.IdWorksheetHeader and
		b.IdWorksheetBody = s.IdWorksheetBody and
		s.IdTipoEvaluacion = t.IdTipoEvaluacion	and
		s.IdWorksheetSeccion = p.IdWorksheetSeccion and
		i.IdPalabra = p.IdPalabra and
		h.IdWorksheetHeader = @IdWorksheetHeader

	GROUP BY

		t.TxtNombreEvaluacion, t.TxtDescripcion

END



