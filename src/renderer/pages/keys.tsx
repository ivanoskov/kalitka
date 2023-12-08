import { Button, Sheet, Table } from '@mui/joy';
import { TableContainer } from '@mui/material';

function Keys() {
  return (
    <Table
      sx={{
        height: 'max-content',
      }}
      aria-label="basic table"
      borderAxis="xBetween"
      color="neutral"
      size="md"
      stickyFooter={false}
      stickyHeader
      variant="plain"
    >
      <thead>
        <tr>
          <th>UUID</th>
          <th>Персонал</th>
          <th>Fat&nbsp;(g)</th>
          <th>Carbs&nbsp;(g)</th>
          <th>Protein&nbsp;(g)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>8012-9123-0059-1233</td>
          <td>
            <Button
              color="neutral"
              onClick={function () {}}
              variant="outlined"
            >
              Андрей Д.
            </Button>
          </td>
          <td>6</td>
          <td>24</td>
          <td>4</td>
        </tr>
      </tbody>
    </Table>
  );
}

export default Keys;
