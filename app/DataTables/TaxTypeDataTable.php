<?php

namespace App\DataTables;

use App\Models\TaxType;
use Yajra\DataTables\Html\Button;
use Yajra\DataTables\Html\Column;
use Yajra\DataTables\Services\DataTable;
use Illuminate\Support\Str;

class TaxTypeDataTable extends DataTable
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
            ->addColumn('action', function($row){
                $showGate       = '';
                $editGate       = 'tax_type_edit';
                $deleteGate     = 'tax_type_delete';
                $crudRoutePart  = 'tax-types';
                
                return view('partials.datatables-action', compact(
                    'showGate', 
                    'editGate', 
                    'deleteGate', 
                    'crudRoutePart',
                    'row',
                ));
            })
            ->editColumn('description', function($row) {
                return $row->description ? Str::limit($row->description, 200) : '-';
            });
    }

    /**
     * Get query source of dataTable.
     *
     * @param \App\Models\TaxType $model
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function query(TaxType $model)
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
                    ->setTableId('taxtype-table')
                    ->columns($this->getColumns())
                    ->minifiedAjax()
                    ->dom('Bfrtip')
                    ->orderBy(1, 'asc')
                    ->addCheckbox(['className' => 'select-checkbox'], true)
                    ->buttons([
                        'export', 
                        'print',
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
                            'attr' => ['id' => 'massDeleteTaxType']
                        ]),
                    ])
                    ->parameters([
                        'select' => [
                            'style' => 'multi',
                            'selector' => 'td:first-child',
                        ],
                        'responsive' => true
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
            Column::make('name')->title('Nama'),
            Column::make('description')->title('Deskripsi'),
            Column::computed('action')
                  ->exportable(false)
                  ->printable(false)
                  ->width(60)
                  ->addClass('text-center'),
        ];
    }

    /**
     * Get filename for export.
     *
     * @return string
     */
    protected function filename(): string
    {
        return 'TaxType_' . date('YmdHis');
    }
}
