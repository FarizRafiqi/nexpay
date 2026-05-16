<?php

namespace App\DataTables;

use App\Models\TaxRate;
use Yajra\DataTables\Html\Button;
use Yajra\DataTables\Html\Column;
use Yajra\DataTables\Html\Editor\Editor;
use Yajra\DataTables\Html\Editor\Fields;
use Yajra\DataTables\Services\DataTable;

class TaxRateDataTable extends DataTable
{
    /**
     * Build DataTable class.
     *
     * @param mixed $query Results from query() method.
     * @return \Yajra\DataTables\DataTableAbstract
     */
    public function dataTable($query)
    {
        return datatables()
            ->eloquent($query)
            ->editColumn('tax_type_id', function($taxRate){
                return $taxRate->taxType->name;
            })
            ->editColumn('rate', function($taxRate){
                return ceil($taxRate->rate) . '%';
            })
            ->editColumn('indonesia_city_id', function($taxRate){
                return $taxRate->city->name;
            })
            ->addColumn('action', function($row){
                $showGate       = '';
                $editGate       = 'tax_rate_edit';
                $deleteGate     = 'tax_rate_delete';
                $crudRoutePart  = 'tax-rates';
                
                return view('partials.datatables-action', compact(
                    'showGate', 
                    'editGate', 
                    'deleteGate', 
                    'crudRoutePart',
                    'row',
                ));
            });
    }

    /**
     * Get query source of dataTable.
     *
     * @param \TaxRate $model
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function query(TaxRate $model)
    {
        return $model->newQuery();
    }

    /**
     * Optional method if you want to use html builder.
     *
     * @return \Yajra\DataTables\Html\Builder
     */
    public function html()
    {
        return $this->builder()
                    ->setTableId('taxrate-table')
                    ->columns($this->getColumns())
                    ->minifiedAjax()
                    ->dom('Bfrtip')
                    ->orderBy(1, 'asc')
                    ->addCheckbox(['className' => 'select-checkbox'], true)
                    ->buttons(
                        Button::make('export'),
                        Button::make('print'),
                        Button::make([
                            'text' => 'Select All',
                            'action' => 'function(e, dt, node, config){
                                dt.rows().select();
                                $(`#dataTablesCheckbox`).prop(`checked`, true);
                            }',
                        ]),
                        Button::make([
                            'text' => 'Deselect All',
                            'action' => 'function(e, dt, node, config){
                                dt.rows().deselect();
                            }',
                        ]),
                        Button::make([
                            'text' => 'Delete Selected',
                            'className' => 'btn-danger',
                            'extend' => 'selected',
                            'attr' => ['id' => 'massDeleteTaxRate']
                        ]),
                    )
                    ->parameters([
                        'paging' => true,
                        'select' => [
                            'style' => 'multi',
                            'selector' => 'td:first-child',
                        ],
                    ]);
    }

    /**
     * Get columns.
     *
     * @return array
     */
    protected function getColumns()
    {
        return [
            Column::make('id'),
            Column::make('tax_type_id', 'taxType.name')->title('Tipe Pajak'),
            Column::make('indonesia_city_id', 'city.name')->title('Kota'),
            Column::make('rate')->title('Presentase'),
            Column::computed('action')
                  ->exportable(false)
                  ->printable(false)
                  ->width(60)
                  ->addClass('text-center')
        ];
    }

    /**
     * Get filename for export.
     *
     * @return string
     */
    protected function filename(): string
    {
        return 'TaxRate_' . date('YmdHis');
    }
}
