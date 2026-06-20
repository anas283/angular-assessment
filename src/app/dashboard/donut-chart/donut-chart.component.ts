import { Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import * as d3 from 'd3';

import { ChartDataItem } from '../models/chart-data.model';

@Component({
  selector: 'app-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.scss']
})
export class DonutChartComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild('chart', { static: true }) chartRef!: ElementRef<HTMLElement>;
  @Input() data: ChartDataItem[] = [];

  private readonly height = 300;
  private readonly colors = ['#a0a0a0', '#b8b8b8', '#d0d0d0', '#909090'];
  private resizeObserver: ResizeObserver | null = null;

  ngOnInit(): void {
    this.resizeObserver = new ResizeObserver(() => this.render());
    this.resizeObserver.observe(this.chartRef.nativeElement);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.render();
    }
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
  }

  private render(): void {
    if (!this.data.length) {
      return;
    }

    const element = this.chartRef.nativeElement;
    element.innerHTML = '';

    const width = element.clientWidth || 400;
    const radius = Math.min(width, this.height) / 2 - 20;

    const svg = d3.select(element)
      .append('svg')
      .attr('width', width)
      .attr('height', this.height)
      .append('g')
      .attr('transform', `translate(${width / 2},${this.height / 2})`);

    const pie = d3.pie<ChartDataItem>().value(d => d.value);
    const arc = d3.arc<d3.PieArcDatum<ChartDataItem>>()
      .innerRadius(radius * 0.5)
      .outerRadius(radius);

    const color = d3.scaleOrdinal<string, string>()
      .domain(this.data.map(d => d.name))
      .range(this.colors);

    svg.selectAll('path')
      .data(pie(this.data))
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', d => color(d.data.name));
  }
}
